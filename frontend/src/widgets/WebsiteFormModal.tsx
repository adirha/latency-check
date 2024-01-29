import {
  Button,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IAddWebsiteFormValues } from "../types";

interface IWebsiteFormModalProps extends ModalProps {
  isEditMode?: boolean;
  form: UseFormReturnType<IAddWebsiteFormValues>;
  onFormSubmit: (values: IAddWebsiteFormValues) => void;
  onWebsiteDelete?: () => void;
}

export const WebsiteFormModal = ({
  form,
  isEditMode,
  onClose,
  onFormSubmit,
  onWebsiteDelete,
  ...rest
}: IWebsiteFormModalProps) => (
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
        <TextInput
          placeholder="My Website"
          label="Website Name"
          withAsterisk
          {...form.getInputProps("name")}
        />
        <TextInput
          placeholder="https//..."
          label="Website URL"
          withAsterisk
          {...form.getInputProps("url")}
        />
        <Group grow>
          <Button onClick={() => form.isValid() && onClose()} type="submit">
            {isEditMode ? "Edit" : "Add"} Website
          </Button>
          {isEditMode && (
            <Button
              color="red"
              onClick={() => {
                onClose();
                onWebsiteDelete && onWebsiteDelete();
              }}
              type="button"
            >
              Delete
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  </Modal>
);
