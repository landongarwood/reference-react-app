import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/modal";
import { BlanketPoResponseDto } from "../../../api";
import { useAppToast, useCookiesLive } from "../../../hooks";
import { useBlanketPoDelete } from "../../../hooks/api/mutations/useBlanketPoDelete";

const DeleteBlanketPOConfirmModal = ({
  blanketPo,
  onClose,
}: {
  blanketPo?: BlanketPoResponseDto;
  onClose: () => void;
}) => {
  const { errorToast, successToast } = useAppToast();
  const [accountId] = useCookiesLive(["accountId"]);

  const { mutate: deleteBlanketPo, isLoading } = useBlanketPoDelete(
    accountId ? +accountId : undefined
  );

  const handleClickConfirm = () => {
    deleteBlanketPo(blanketPo?.blanketPoId!, {
      onError: () => {
        errorToast("Unable to delete Blanket PO.");
      },
      onSuccess: () => {
        successToast("Blanket PO has been deleted");
        onClose();
      },
    });
  };

  return (
    <Modal isOpen size="lg" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="md">
            Are you sure you want to delete Blanket PO {blanketPo?.po}?
          </Text>
        </ModalBody>

        <ModalFooter sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button disabled={isLoading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            isLoading={isLoading}
            variant="solid"
            onClick={handleClickConfirm}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBlanketPOConfirmModal;
