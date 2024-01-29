import { Stack, Text, Title, createStyles } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IAddWebsiteFormValues, Thresholds, Website } from "../../../types";
import { WebsiteCard } from "../../../widgets/WebsiteCard";
import { WebsiteFormModal } from "../../../widgets/WebsiteFormModal";

const useStyles = createStyles(() => ({
  largeText: {
    textOverflow: "ellipsis",
    lineBreak: "anywhere",
  },
}));

interface IWebsiteCardPreviewProps {
  website: Website;
  thresholds: Thresholds;
  updateWebsite: (website: Website) => Promise<void>;
  refetchWebsites: () => Promise<void>;
}

export const WebsiteCardPreview = ({
  website,
  thresholds,
  refetchWebsites,
  updateWebsite,
}: IWebsiteCardPreviewProps) => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      url: website.url,
      name: website.name,
    },
    validate: {
      name: isNotEmpty("Name field cannot be empty"),
      url: isNotEmpty("URL field cannot be empty"),
    },
  });

  const editWebsite = async (values: IAddWebsiteFormValues) => {
    updateWebsite({ ...website, ...values });
    refetchWebsites();
  };

  const deleteWebsite = async () => {
    const res = await fetch(`/api/v1/websites/${website.id}`, {
      method: "DELETE",
    });
    await res.json();
    refetchWebsites();
  };

  const onUpdateWebsiteFormSubmit = (values: IAddWebsiteFormValues) => {
    form.reset();
    editWebsite(values);
  };
  return (
    <>
      <WebsiteCard
        websiteLatencyMs={website.msLatency}
        onClick={open}
        thresholds={thresholds}
      >
        <Stack spacing="xs">
          <Title order={4}>{website.name}</Title>
          <Text fz="sm" className={classes.largeText}>
            {website.url}
          </Text>
        </Stack>
      </WebsiteCard>

      <WebsiteFormModal
        isEditMode
        form={form}
        opened={opened}
        onClose={close}
        onFormSubmit={onUpdateWebsiteFormSubmit}
        onWebsiteDelete={deleteWebsite}
      />
    </>
  );
};
