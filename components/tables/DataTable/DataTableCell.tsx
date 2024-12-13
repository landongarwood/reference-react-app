import { Td, Text, Tooltip } from "@chakra-ui/react";
import { Cell, flexRender } from "@tanstack/react-table";
import { memo, ReactNode } from "react";
import { CHECKBOX_COLUMN_ID } from "../../../constants/dataTable";

const DataTableCell = <TData extends Record<string, any>>({
  cell,
}: {
  cell: Cell<TData, unknown>;
}) => {
  const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext());

  return cell.column.columnDef.id === CHECKBOX_COLUMN_ID ? (
    <Td
      data-testid="dt-cell-checkbox"
      justifyContent="center"
      px="0"
      w={`${cell.column.getSize()}px`}
    >
      {cellContent}
    </Td>
  ) : (
    <Td
      data-testid={`dt-cell-${cell.column.columnDef.id}`}
      w={`${cell.column.getSize()}px`}
    >
      <Tooltip label={cellContent as ReactNode} placement="bottom">
        <Text overflow="hidden" w="full">
          {cellContent}
        </Text>
      </Tooltip>
    </Td>
  );
};

export default memo(DataTableCell) as typeof DataTableCell;
