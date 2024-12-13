import {
  Button,
  StyleProps,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BlanketPoResponseDto } from "../../../api";
import { useCookiesLive } from "../../../hooks";
import { useBlanketPOs } from "../../../hooks/api/queries";
import BlanketPOsTableRow from "./BlanketPOsTableRow";
import DeleteBlanketPOConfirmModal from "./DeleteBlanketPOConfirmModal";

const thStyle: StyleProps = {
  bg: "gray.130",
  color: "gray.700",
  fontSize: "sm",
  fontWeight: "semibold",
  h: 12,
  position: "sticky",
  px: 4,
  py: 0,
  top: 0,
  zIndex: 1,
};

const BlanketPOsTable = () => {
  const [accountId] = useCookiesLive(["accountId"]);
  const { data: blanketPOsData } = useBlanketPOs(
    accountId ? +accountId : undefined
  );

  const [isCreating, setIsCreating] = useState(false);
  const [deletingBlanketPo, setDeletingBlanketPo] =
    useState<BlanketPoResponseDto>();
  const [editingBlanketPo, setEditingBlanketPo] =
    useState<BlanketPoResponseDto>();

  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClickCreate = () => {
    setIsCreating(true);

    setTimeout(() => {
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollTop =
          tableContainerRef.current.scrollHeight;
      }
    }, 500);
  };

  useEffect(() => {
    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setEditingBlanketPo(undefined);
        setIsCreating(false);
      }
    };

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, []);

  return (
    <>
      <TableContainer ref={tableContainerRef} maxHeight={375} overflowY="auto">
        <Table position="relative" variant="unstyled">
          <Thead>
            <Tr>
              <Th {...thStyle}>BLANKET PO</Th>
              <Th {...thStyle}>DESCRIPTION</Th>
              <Th {...thStyle}>STORED IN FIELD</Th>
              <Th {...thStyle}>VALUE</Th>
              <Th {...thStyle}>INVOICES</Th>
              <Th {...thStyle}>OPEN ORDER VALUE</Th>
              <Th {...thStyle}>AVAILABLE</Th>
              <Th {...thStyle}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {blanketPOsData?.map((row, index) => (
              <BlanketPOsTableRow
                key={row.blanketPoId + "" + index}
                blanketPo={row}
                isEditing={
                  editingBlanketPo !== undefined &&
                  editingBlanketPo.blanketPoId === row.blanketPoId
                }
                onClickCancel={() => setEditingBlanketPo(undefined)}
                onClickDelete={() => setDeletingBlanketPo(row)}
                onClickEdit={() => setEditingBlanketPo(row)}
              />
            ))}
            {isCreating && (
              <BlanketPOsTableRow onClickCancel={() => setIsCreating(false)} />
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {!isCreating && (
        <Button
          colorScheme="blue"
          data-testid="add-blanket-po-button"
          sx={{ m: 2 }}
          variant="solid"
          onClick={handleClickCreate}
        >
          Add Blanket PO
        </Button>
      )}

      {deletingBlanketPo && (
        <DeleteBlanketPOConfirmModal
          blanketPo={deletingBlanketPo}
          onClose={() => setDeletingBlanketPo(undefined)}
        />
      )}
    </>
  );
};

export default BlanketPOsTable;
