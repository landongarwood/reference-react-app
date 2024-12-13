import { Box, IconButton, Text, Th } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, Header } from "@tanstack/react-table";
import {
  CHECKBOX_COLUMN_ID,
  TABLE_ROW_HEIGHT,
} from "../../../constants/dataTable";
import { SortAscIcon, SortDescIcon } from "../../icons";

const DataTableColumn = <TData,>({
  header,
}: {
  header: Header<TData, unknown>;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setActivatorNodeRef,
  } = useSortable({ id: header.id });

  const sortDirection = header.column.getIsSorted();

  return (
    <Th
      ref={setNodeRef}
      colSpan={header.colSpan}
      cursor={isDragging ? "grabbing" : "pointer"}
      data-testid={`dt-column-${header.column.columnDef.id}`}
      h={TABLE_ROW_HEIGHT}
      p={0}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      w={`${header.getSize()}px`}
      zIndex={isDragging ? 1 : "unset"}
      {...attributes}
    >
      <Box
        data-testid="dt-column-drag-preview"
        h="full"
        w="full"
        onClick={
          header.column.columnDef.id !== CHECKBOX_COLUMN_ID
            ? header.column.getToggleSortingHandler()
            : undefined
        }
      >
        <Box
          ref={setActivatorNodeRef}
          {...listeners}
          alignItems="center"
          data-testid="dt-column-drag-handler"
          display="flex"
          h="full"
          justifyContent="space-between"
          px={header.id === CHECKBOX_COLUMN_ID ? "10px" : 4}
        >
          <Text alignItems="center" as="span" display="inline-flex" gap={2}>
            {flexRender(header.column.columnDef.header, header.getContext())}
            {sortDirection ? (
              <IconButton
                _hover={{
                  color: "blue.700",
                }}
                alignItems="center"
                aria-label="Sort"
                bgColor="#eee"
                color="gray.600"
                data-testid={`dt-column-sort-${sortDirection}`}
                display="inline-flex"
                fontSize="sm"
                h={17}
                icon={
                  sortDirection === "asc" ? <SortAscIcon /> : <SortDescIcon />
                }
                justifyContent="center"
                minW={23}
                rounded={2}
                variant="unstyled"
                w={23}
              />
            ) : null}
          </Text>
        </Box>
      </Box>
    </Th>
  );
};

export default DataTableColumn;
