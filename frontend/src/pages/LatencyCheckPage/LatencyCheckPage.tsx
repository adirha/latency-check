import { Center, Grid, Loader, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { Frequency, Thresholds, Website } from "../../types";
import { AddWebsiteCard } from "./components/AddWebsiteCard";
import { LatencyCheckPageHeader } from "./components/LatencyCheckPageHeader";
import { WebsiteCardPreview } from "./components/WebsiteCardPreview";

export const LatencyCheckPage = () => {
  const [loading, setLoading] = useState(true);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [currentIntervalId, setCurrentIntervalId] = useState<NodeJS.Timer>();
  const [samplingFrequency, setSamplingFrequency] = useState<Frequency>();
  const [thresholds, setThresholds] = useState<Thresholds>();

  const loadWebsites = async () => {
    if (!loading) {
      setLoading(true);
    }
    const res = await fetch("/api/v1/websites");
    const data = await res.json();
    setWebsites(data);
    setLoading(false);
  };

  const loadThresholds = async () => {
    const res = await fetch("/api/v1/thresholds");
    const data = await res.json();
    setThresholds(data);
  };

  const updateThresholds = async (thresholds: Thresholds) => {
    const res = await fetch("/api/v1/thresholds", {
      method: "PUT",
      body: JSON.stringify(thresholds),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setThresholds(data);
  };

  const updateWebsite = async (website: Website) => {
    const res = await fetch(`/api/v1/websites/${website.id}`, {
      method: "PUT",
      body: JSON.stringify(website),
      headers: { "Content-Type": "application/json" },
    });
    await res.json();
  };

  const loadSamplingFrequency = async () => {
    const res = await fetch("/api/v1/frequencies");
    const data: Frequency = await res.json();
    setSamplingFrequency(data);
  };

  const updateSamplingFrequency = async (msTime: number) => {
    const res = await fetch(`/api/v1/frequencies`, {
      method: "PUT",
      body: JSON.stringify({ msTime }),
      headers: { "Content-Type": "application/json" },
    });
    const data: Frequency = await res.json();
    setSamplingFrequency(data);
  };

  useEffect(() => {
    loadWebsites();
    loadThresholds();
    loadSamplingFrequency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (currentIntervalId) {
      clearInterval(currentIntervalId);
    }
    const intervalId = setInterval(() => {
      checkWebsitesLatency();
    }, samplingFrequency?.msTime);
    setCurrentIntervalId(intervalId);
    return () => {
      clearInterval(currentIntervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, samplingFrequency]);

  const checkWebsitesLatency = async () => {
    await updatedWebsitesLatency();
  };

  // Note:
  // This should be done trough the backend, but it requires Socket.io implementing in order to notice
  // the client that the changes has been made, and I didn't had enough time to implement the socket.io mechanism
  const updatedWebsitesLatency = async () => {
    try {
      const options = {
        mode: "no-cors",
        headers: { "Timing-Allow-Origin": "*" },
      };
      const newWebsites: Website[] = [];
      for (const website of websites) {
        let isAllowedOrigin;
        let ttfb; // Time to first Byte
        const req = await fetch(website.url, options as RequestInit);
        await req.text();
        const pagePerformance = performance.getEntriesByName(website.url);
        if (pagePerformance?.length) {
          const perf = pagePerformance[0] as PerformanceResourceTiming;
          ttfb = perf.responseStart - perf.requestStart;
          isAllowedOrigin = ttfb !== 0;
        }
        if (isAllowedOrigin) {
          website.msLatency = ttfb;
        } else {
          // This is a fallback,
          // This option is lass accurate, because it considered the server processing time, download time etc.
          const timeBeforeRequest = Date.now();
          const newRequest = await fetch(website.url, options as RequestInit);
          await newRequest.text();
          const timeAfterRequest = Date.now();
          const totalTime = timeAfterRequest - timeBeforeRequest;
          website.msLatency = totalTime;
        }
        await updateWebsite(website);
        newWebsites.push(website);
      }
      setWebsites(newWebsites);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || !samplingFrequency || !thresholds) {
    return <Loader />;
  }

  return (
    <Center>
      <Stack>
        <h1>LatencyCheckPage</h1>
        <LatencyCheckPageHeader
          thresholds={thresholds}
          updateSamplingFrequency={updateSamplingFrequency}
          updateThresholds={updateThresholds}
          samplingFrequency={samplingFrequency}
        />
        <Grid gutter="xs">
          {websites.map((website) => (
            <WebsiteCardPreview
              thresholds={thresholds}
              key={website.id}
              website={website}
              updateWebsite={updateWebsite}
              refetchWebsites={loadWebsites}
            />
          ))}
          <AddWebsiteCard refetchWebsites={loadWebsites} />
        </Grid>
      </Stack>
    </Center>
  );
};
