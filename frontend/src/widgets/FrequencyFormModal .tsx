import {
  ActionIcon,
  Button,
  Group,
  Modal,
  ModalProps,
  Stack,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";
import { IFrequencyFormValues } from "../types";

interface IFrequencyFormModalProps extends ModalProps {
  form: UseFormReturnType<IFrequencyFormValues>;
  onFormSubmit: (values: IFrequencyFormValues) => void;
}

export const FrequencyFormModal = ({
  form,
  onClose,
  onFormSubmit,
  ...rest
}: IFrequencyFormModalProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Modal
      closeOnClickOutside
      onClose={onClose}
      radius="md"
      withCloseButton={false}
      {...rest}
    >
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Stack spacing="xs">
          <TimeInput
            withSeconds
            label="Pick sampling frequency"
            ref={ref}
            rightSection={
              <ActionIcon onClick={() => ref.current?.showPicker()}>
                <IconClock size="1rem" stroke={1.5} />
              </ActionIcon>
            }
            maw={400}
            mx="auto"
            {...form.getInputProps("time")}
          />
          <Group grow>
            <Button onClick={() => form.isValid() && onClose()} type="submit">
              Update Sampling Frequency
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
