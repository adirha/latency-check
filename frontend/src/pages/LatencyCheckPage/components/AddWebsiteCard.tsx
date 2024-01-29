import { Flex } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { IAddWebsiteFormValues } from "../../../types";
import { WebsiteCard } from "../../../widgets/WebsiteCard";
import { WebsiteFormModal } from "../../../widgets/WebsiteFormModal";

export const AddWebsiteCard = ({
  refetchWebsites,
}: {
  refetchWebsites: () => Promise<void>;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      name: "",
      url: "",
    },
    validate: {
      name: isNotEmpty("Name field cannot be empty"),
      url: isNotEmpty("URL field cannot be empty"),
    },
  });

  const addWebsite = async (values: IAddWebsiteFormValues) => {
    const res = await fetch("/api/v1/websites", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    await res.json();
    refetchWebsites();
  };

  const onFormSubmit = (values: IAddWebsiteFormValues) => {
    form.reset();
    addWebsite(values);
  };

  return (
    <>
      <WebsiteCard onClick={open} isAddCard>
        <Flex justify="center" align="center" h="100%">
          <IconPlus size="42px" />
        </Flex>
      </WebsiteCard>
      <WebsiteFormModal
        opened={opened}
        onClose={close}
        form={form}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
};
