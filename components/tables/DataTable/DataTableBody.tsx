import { CircularProgress, Tbody, Td, Tr } from "@chakra-ui/react";
import { Row } from "@tanstack/react-table";
import { VirtualItem } from "@tanstack/react-virtual";
import classNames from "classnames";
import { Fragment, useState } from "react";
import {
  CHECKBOX_COLUMN_ID,
  TABLE_ACTION_COLUMN_WIDTH,
  TABLE_ROW_HEIGHT,
} from "../../../constants/dataTable";
import DataTableActionCell from "./DataTableActionCell";
import DataTableCell from "./DataTableCell";

import { useDataTableContext } from "./DataTableContext";

const getRowWidth = <TData,>(
  row: Row<TData>,
  additionalColumnId?: string,
  hasActionColumn?: boolean
) =>
  row
    .getVisibleCells()
    .filter((cell) => cell.column.id !== additionalColumnId)
    .reduce(
      (prev, curr) =>
        prev +
        ((curr.column.columnDef.id ?? "") === CHECKBOX_COLUMN_ID
          ? 36
          : curr.column.getSize()),
      0
    ) + (hasActionColumn ? TABLE_ACTION_COLUMN_WIDTH : 0);

const DataTableBody = <TData extends Record<string, any>>({
  virtualRows,
  hasNextPage,
  isAdditionalColumnVisible,
  rows,
  newRows,
}: {
  virtualRows: VirtualItem<TData>[];
  rows: Row<TData>[];
  newRows: TData[];
  hasNextPage: boolean;
  isAdditionalColumnVisible: boolean;
}) => {
  const { additionalColumnId, hasActionColumn, identifier } =
    useDataTableContext();
  const [activeRow, setActiveRow] = useState<Row<TData>>();

  return (
    <Tbody data-testid="dt-body">
      {virtualRows.map((virtualRow) => {
        const isLoaderRow = virtualRow.index > rows.length - 1;
        const row = rows[virtualRow.index];
        const isActiveRow =
          activeRow !== undefined &&
          row.original.id === activeRow?.original?.id;

        const isNewRow = !!(
          identifier &&
          newRows.find(
            (newRow) =>
              row.original[identifier as string] ===
              newRow[identifier as string]
          )
        );

        return (
          <Fragment key={virtualRow.index}>
            <Tr
              className={classNames({
                "active-row": isActiveRow,
                "has-border": !isAdditionalColumnVisible,
                "new-row": isNewRow,
              })}
              height={`${
                isLoaderRow || !isAdditionalColumnVisible
                  ? virtualRow.size
                  : virtualRow.size / 2
              }px`}
              right={isLoaderRow ? 0 : "unset"}
              transform={`translateY(${virtualRow.start}px)`}
            >
              {isLoaderRow ? (
                <Td justifyContent="center" w="full">
                  {hasNextPage ? (
                    <CircularProgress
                      isIndeterminate
                      color="gray.300"
                      size="16px"
                    />
                  ) : (
                    "Nothing more to load"
                  )}
                </Td>
              ) : (
                <>
                  {row
                    .getVisibleCells()
                    .filter((cell) => cell.column.id !== additionalColumnId)
                    .map((cell) => (
                      <DataTableCell key={cell.id} cell={cell} />
                    ))}
                  {hasActionColumn && (
                    <DataTableActionCell<TData>
                      entity={row.original}
                      isActiveRow={isActiveRow}
                      onActionMenuClosed={() => setActiveRow(undefined)}
                      onActionMenuOpened={() => setActiveRow(row)}
                    />
                  )}
                </>
              )}
            </Tr>
            {!isLoaderRow &&
              additionalColumnId &&
              isAdditionalColumnVisible && (
                <Tr
                  className={classNames("striped-row", {
                    "new-striped-row": isNewRow,
                  })}
                  height={`${virtualRow.size / 2}px`}
                  transform={`translateY(${
                    virtualRow.start + TABLE_ROW_HEIGHT
                  }px)`}
                  w={`${getRowWidth(
                    row,
                    additionalColumnId,
                    hasActionColumn
                  )}px`}
                >
                  <Td data-testid={`dt-cell-${additionalColumnId}`} w="full">
                    {row.original[additionalColumnId]}
                  </Td>
                </Tr>
              )}
          </Fragment>
        );
      })}
    </Tbody>
  );
};

export default DataTableBody;
