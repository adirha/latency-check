import {
  Button,
  Group,
  Modal,
  ModalProps,
  NumberInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IThresholdsFormValues } from "../types";

interface IIWebsiteFormModalProps extends ModalProps {
  form: UseFormReturnType<IThresholdsFormValues>;
  onFormSubmit: (values: IThresholdsFormValues) => void;
}

export const ThresholdsFormModal = ({
  form,
  onClose,
  onFormSubmit,
  ...rest
}: IIWebsiteFormModalProps) => (
  <Modal
    closeOnClickOutside
    onClose={() => {
      form.reset();
      onClose();
    }}
    radius="md"
    withCloseButton={false}
    {...rest}
  >
    <form onSubmit={form.onSubmit(onFormSubmit)}>
      <Stack spacing="xs">
        <Title order={3}>Please enter the desired time in MS</Title>
        <NumberInput
          label="Green"
          description="For latency below the provided number"
          {...form.getInputProps("low.0")}
        />

        <Stack spacing={0}>
          <Text fz="sm">Orange</Text>
          <Group noWrap>
            <NumberInput {...form.getInputProps("medium.0")} />
            <Text>Between</Text>
            <NumberInput {...form.getInputProps("medium.1")} />
          </Group>
        </Stack>

        <NumberInput
          label="Red"
          description="For latency over the provided number"
          {...form.getInputProps("high.0")}
        />
        <Group grow>
          <Button onClick={onClose} type="submit">
            Update Sampling Frequency
          </Button>
        </Group>
      </Stack>
    </form>
  </Modal>
);
