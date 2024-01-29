import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import {
  Frequency,
  IFrequencyFormValues,
  IThresholdsFormValues,
  Thresholds,
} from "../../../types";
import { convertMsToTime, timeToMs } from "../../../utils/calculations";
import { getBenchmarkSettings } from "../../../utils/content";
import { FrequencyFormModal } from "../../../widgets/FrequencyFormModal ";
import { ThresholdsFormModal } from "../../../widgets/ThresholdsFormModal";

interface ILatencyCheckPageHeaderProps {
  thresholds: Thresholds;
  samplingFrequency: Frequency;
  updateSamplingFrequency: (msTime: number) => Promise<void>;
  updateThresholds: (thresholds: Thresholds) => Promise<void>;
}

export const LatencyCheckPageHeader = ({
  thresholds,
  samplingFrequency,
  updateSamplingFrequency,
  updateThresholds,
}: ILatencyCheckPageHeaderProps) => {
  const [
    isFrequencyModalOpened,
    { open: openFrequencyModal, close: closeFrequencyModal },
  ] = useDisclosure(false);
  const [
    isThresholdsModalOpened,
    { open: openThresholdsModal, close: closeThresholdsModal },
  ] = useDisclosure(false);

  const frequencyForm = useForm({
    initialValues: {
      time: convertMsToTime(samplingFrequency?.msTime || 0),
    },
    validate: {
      time: (value) => {
        const timeParts = value.split(":");
        const seconds = +timeParts[2];
        const isLimitExceeded =
          seconds < 10 && timeParts[0] === "00" && timeParts[1] === "00";
        if (isLimitExceeded) {
          return "Please set a minimum of 10 seconds";
        }
        return null;
      },
    },
  });

  const thresholdsForm = useForm({
    initialValues: {
      low: thresholds.low,
      medium: thresholds.medium,
      high: thresholds.high,
    },
  });

  const onFrequencyFormSubmit = (values: IFrequencyFormValues) => {
    const timeParts = values.time.split(":");
    const timeInMs = timeToMs(+timeParts[0], +timeParts[1], +timeParts[2]);
    updateSamplingFrequency(timeInMs);
  };

  const onThresholdsFormSubmit = async (values: IThresholdsFormValues) => {
    await updateThresholds(values);
  };

  useEffect(() => {
    frequencyForm.setFieldValue(
      "time",
      convertMsToTime(samplingFrequency?.msTime || 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [samplingFrequency]);

  return (
    <Group align="flex-start" position="apart" mb="lg">
      <Stack spacing="xs">
        <Title order={3}>Frequency of Sampling:</Title>
        <Text fz="md">Every {convertMsToTime(samplingFrequency?.msTime)}</Text>
        <Button onClick={openFrequencyModal}>Change Sampling Frequency</Button>
      </Stack>
      <Stack spacing="xs">
        <Title order={3}>Benchmark Settings:</Title>
        {getBenchmarkSettings(thresholds).map((content, index) => (
          <Text key={index} fz="md">
            {content}
          </Text>
        ))}
        <Button onClick={openThresholdsModal}>Change benchmark settings</Button>
      </Stack>
      <FrequencyFormModal
        form={frequencyForm}
        opened={isFrequencyModalOpened}
        onClose={closeFrequencyModal}
        onFormSubmit={onFrequencyFormSubmit}
      />
      <ThresholdsFormModal
        form={thresholdsForm}
        opened={isThresholdsModalOpened}
        onClose={closeThresholdsModal}
        onFormSubmit={onThresholdsFormSubmit}
      />
    </Group>
  );
};
