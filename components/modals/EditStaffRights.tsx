import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { kebabCase, keys, sortBy } from "lodash";
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import { StaffListing, UserPermissionsDto } from "../../api";
import { useAppToast } from "../../hooks";
import { useUserRightsUpdate } from "../../hooks/api/mutations";
import { useUserRights } from "../../hooks/api/queries";

type RightsState = { [id: string]: { name: string; isActivated: boolean } };

const EditStaffRights = ({
  isOpen,
  staff,
  onClose,
}: {
  isOpen: boolean;
  staff: StaffListing;
  onClose: () => void;
}) => {
  const { data, isFetching } = useUserRights(staff.userId);
  const [rightsState, setRightsState] = useState<RightsState>({});
  const { mutate: updateRights } = useUserRightsUpdate(staff.userId!);
  const { successToast, errorToast } = useAppToast();

  useEffect(() => {
    if (data && !isFetching) {
      setRightsState(
        sortBy(
          data.filter((right) => (right as UserPermissionsDto).type === "Rep"),
          (right) => !(right as UserPermissionsDto).active
        ).reduce(
          (prev, curr) => ({
            ...prev,
            [curr.rightCode]: {
              isActivated: (curr as UserPermissionsDto).active,
              name: curr.rightName,
            },
          }),
          {}
        )
      );
    }
  }, [data, isFetching]);

  const handleRightsStateUpdate = useCallback(
    (e: ChangeEvent<HTMLInputElement>, rightCode: string) => {
      setRightsState((prev) => ({
        ...prev,
        [rightCode]: {
          ...prev[rightCode],
          isActivated: e.target.checked,
        },
      }));
    },
    []
  );

  const handleSubmit = useCallback(() => {
    updateRights(
      Object.keys(rightsState).map((rightCode) => ({
        active: rightsState[rightCode].isActivated,
        rightCode,
      })),
      {
        onError: () => {
          errorToast(
            `Unable to update rights for ${staff.firstName} ${staff.lastName} (${staff.email})`
          );
        },
        onSettled: () => {
          onClose();
        },
        onSuccess: () => {
          successToast(
            `Rights updated for ${staff.firstName} ${staff.lastName} (${staff.email})`
          );
        },
      }
    );
  }, [errorToast, onClose, rightsState, staff, successToast, updateRights]);

  return (
    <Modal
      autoFocus={false}
      data-testid="select-columns-modal"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader data-testid="select-columns-modal-title" pb="5" pt="7">
          Edit Rights for {staff.firstName} {staff.lastName} ({staff.username})
        </ModalHeader>
        <ModalCloseButton data-testid="select-columns-modal-close-icon" />
        <ModalBody data-testid="select-columns-modal-body">
          <VStack
            align="stretch"
            sx={{ maxHeight: "60vh", overflowX: "hidden", overflowY: "auto" }}
          >
            {keys(rightsState).map((rightCode) => (
              <Fragment key={rightCode}>
                {
                  <Checkbox
                    data-testid={`select-columns-modal-column-${kebabCase(
                      rightCode
                    )}`}
                    defaultChecked={rightsState[rightCode].isActivated}
                    onChange={(e) => handleRightsStateUpdate(e, rightCode)}
                  >
                    <Text>{rightsState[rightCode].name}</Text>
                  </Checkbox>
                }
              </Fragment>
            ))}
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button
            data-testid="select-columns-modal-close-btn"
            h={9}
            variant="outline"
            w="24"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            colorScheme="blue"
            data-testid="select-columns-modal-save-btn"
            h={9}
            variant="solid"
            w="24"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default EditStaffRights;
