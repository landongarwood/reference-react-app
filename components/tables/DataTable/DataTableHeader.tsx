import { Th, Thead, Tr } from "@chakra-ui/react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { ColumnOrderState } from "@tanstack/react-table";
import { Fragment, useCallback } from "react";
import {
  CHECKBOX_COLUMN_ID,
  TABLE_ACTION_COLUMN_WIDTH,
  TABLE_FILTER_HEIGHT,
} from "../../../constants/dataTable";
import { ThreeDotsIcon } from "../../icons";
import DataTableColumn from "./DataTableColumn";
import { useDataTableContext } from "./DataTableContext";
import DataTableFilter from "./DataTableFilter";

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

const DataTableHeader = ({ isScrolled }: { isScrolled: boolean }) => {
  const { table, additionalColumnId, filterFocusedColumnId, hasActionColumn } =
    useDataTableContext();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleColumnMove = useCallback(
    (event: DragEndEvent) => {
      const columnOrder = table?.getState().columnOrder ?? [];
      const newColumnOrder = reorderColumn(
        event.active.id as string,
        event.over?.id as string,
        columnOrder
      );
      if (table) {
        table.setColumnOrder(newColumnOrder);
      }
    },
    [table]
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleColumnMove}
    >
      <Thead
        boxShadow={isScrolled ? "0px 2px 4px rgba(86,86,86, 0.5)" : undefined}
        data-testid="dt-header"
      >
        {table?.getHeaderGroups().map((headerGroup) => {
          const renderingHeaders = headerGroup.headers.filter(
            (header) => header.id !== additionalColumnId
          );

          return renderingHeaders.length > 0 ? (
            <Fragment key={headerGroup.id}>
              <SortableContext
                items={renderingHeaders}
                strategy={horizontalListSortingStrategy}
              >
                <Tr data-testid="dt-column-names">
                  {renderingHeaders.map((header) => (
                    <DataTableColumn key={header.id} header={header} />
                  ))}
                  {hasActionColumn && (
                    <Th
                      display="flex"
                      justifyContent="center"
                      width={TABLE_ACTION_COLUMN_WIDTH}
                    >
                      <ThreeDotsIcon h={6} w={6} />
                    </Th>
                  )}
                </Tr>
              </SortableContext>
              <Tr borderBottom="none" data-testid="dt-column-filters">
                {renderingHeaders.map((header) => (
                  <Th
                    key={header.id}
                    bg="gray.100"
                    colSpan={header.colSpan}
                    data-testid={`dt-column-${header.column.columnDef.id}`}
                    h={TABLE_FILTER_HEIGHT}
                    overflow="visible"
                    w={`${header.getSize()}px`}
                    zIndex={
                      filterFocusedColumnId === header.column.columnDef.id
                        ? "overlay"
                        : "auto"
                    }
                  >
                    {header.isPlaceholder ||
                    header.id === CHECKBOX_COLUMN_ID ? null : (
                      <DataTableFilter header={header} />
                    )}
                  </Th>
                ))}
                {hasActionColumn && (
                  <Th
                    bg="gray.100"
                    h={TABLE_FILTER_HEIGHT}
                    overflow="visible"
                    w={TABLE_ACTION_COLUMN_WIDTH}
                  />
                )}
              </Tr>
            </Fragment>
          ) : null;
        })}
      </Thead>
    </DndContext>
  );
};

export default DataTableHeader;
