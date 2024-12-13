import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Table,
  TableContainer,
  useToast,
  Text,
} from "@chakra-ui/react";
import {
  ColumnDef,
  ColumnOrderState,
  getCoreRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { isArray, isObject, keys } from "lodash";
import {
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ViewRes } from "../../../api";
import {
  CHECKBOX_COLUMN_ID,
  SCROLL_TO_TOP_AVAILABLE_AT,
  TABLE_ACTIONS_HEIGHT,
  TABLE_FILTER_HEIGHT,
  TABLE_OVERSCAN,
  TABLE_ROW_HEIGHT,
} from "../../../constants/dataTable";
import useScrollbarWidth from "../../../hooks/layout/useScrollbarWidth";
import { ActionRowItem } from "../../../types";
import {
  ChevronUpIcon,
  DropdownIcon,
  InfoCircleIcon,
  PencilIcon,
  ScheduleIcon,
} from "../../icons";
import SelectColumns from "../../modals/SelectColumns";
import DataTableBody from "./DataTableBody";
import { useDataTableContext } from "./DataTableContext";
import DataTableHeader from "./DataTableHeader";
import ExportButton from "./ExportButton";
import PrintButton from "./PrintButton";

const DataTable = <TData extends Record<string, unknown>>({
  actionRowItems,
  isFetchingNextPage,
  isLoading,
  isViewsLoading,
  hasNextPage,
  views,
  onFetchNextPage,
  activeView,
  onChangeView,
  totalElements,
  newRows,
  onResetNewRows,
  isSelectable,
  onRowsSelect,
  selectedRows,
}: {
  actionRowItems?: ActionRowItem[];
  isViewsLoading: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  hasNextPage: boolean;
  isSelectable: boolean;
  activeView?: ViewRes;
  views: ViewRes[];
  onFetchNextPage: () => void;
  onChangeView: (view?: ViewRes) => void;
  totalElements: number;
  newRows: TData[];
  selectedRows?: TData[];
  onResetNewRows: () => void;
  onRowsSelect?: (rows: TData[]) => void;
}) => {
  const {
    tableColumns,
    tableData,
    additionalColumnId,
    rawColumns,
    criteria,
    identifier,
    updateSort,
    setTable,
    updateColumns,
  } = useDataTableContext();

  const toast = useToast();
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const [columnsSelectorOpened, setColumnsSelectorOpened] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useScrollbarWidth(tableContainerRef);

  const tableRowsIndexMap = useMemo(
    () =>
      identifier
        ? tableData.reduce(
            (prev, curr, index) => ({
              ...prev,
              [curr[identifier]]: index,
            }),
            {}
          )
        : {},
    [identifier, tableData]
  );

  const rowSelection = useMemo(
    () =>
      identifier
        ? selectedRows?.reduce(
            (prev, curr) => ({
              ...prev,
              [tableRowsIndexMap[curr[identifier as any] as any]]: true,
            }),
            {}
          ) ?? {}
        : {},
    [identifier, tableRowsIndexMap, selectedRows]
  );

  const table = useReactTable<TData>({
    columns: tableColumns as ColumnDef<TData, unknown>[],
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    onColumnOrderChange: (orderState) => {
      if (isArray(orderState)) {
        setColumnOrder(orderState);
        updateColumns(orderState);
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updaterOrValue) => {
      const newSelection =
        typeof updaterOrValue === "function"
          ? updaterOrValue(rowSelection)
          : updaterOrValue;
      if (isObject(newSelection)) {
        if (onRowsSelect) {
          onRowsSelect(
            keys(newSelection)
              .filter((rowIndex) => (newSelection as any)[rowIndex])
              .map((rowIndex) => tableData[+rowIndex])
          );
        }
      }
    },
    onSortingChange: (updaterOrValue) => {
      const value =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting)
          : updaterOrValue;
      setSorting(value);
      if (value.length) {
        updateSort(value[0].id, value[0].desc ? 1 : 0);
      } else {
        updateSort(); // clear sort
      }
    },
    state: {
      columnOrder: [
        ...(isSelectable ? [CHECKBOX_COLUMN_ID] : []),
        ...columnOrder.filter((column) => column !== CHECKBOX_COLUMN_ID),
      ],
      columnVisibility: {
        [CHECKBOX_COLUMN_ID]: isSelectable,
        ...columnVisibility,
      },
      rowSelection,
      sorting,
    },
  });

  useEffect(() => {
    setTable(table);
  }, [setTable, table]);

  const { rows } = table.getRowModel();
  const isAdditionalColumnVisible = useMemo(
    () => !!(additionalColumnId && columnVisibility[additionalColumnId]),
    [additionalColumnId, columnVisibility]
  );

  const rowVirtualizer = useVirtualizer<any, any>({
    count: hasNextPage ? rows.length + 1 : rows.length,
    estimateSize: () =>
      isAdditionalColumnVisible ? TABLE_ROW_HEIGHT * 2 : TABLE_ROW_HEIGHT,
    getScrollElement: () => tableContainerRef.current,
    overscan: TABLE_OVERSCAN,
    paddingStart: TABLE_ROW_HEIGHT + TABLE_FILTER_HEIGHT,
    scrollPaddingStart:
      TABLE_ROW_HEIGHT + TABLE_FILTER_HEIGHT + TABLE_ACTIONS_HEIGHT,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [isAdditionalColumnVisible, rowVirtualizer]);

  const { startIndex } = (rowVirtualizer as any).range;

  const virtualRows = rowVirtualizer.getVirtualItems();
  const allLeafColumns = table.getAllLeafColumns();

  const manageableColumns = useMemo(
    () => allLeafColumns.filter((column) => column.id !== CHECKBOX_COLUMN_ID),
    [allLeafColumns]
  );

  useEffect(() => {
    const [lastItem] = [...virtualRows].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= rows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      onFetchNextPage();
    }
  }, [
    hasNextPage,
    onFetchNextPage,
    isFetchingNextPage,
    rows.length,
    virtualRows,
  ]);

  const onTableScroll = useCallback((e: SyntheticEvent) => {
    if (e.target !== tableContainerRef.current) {
      return;
    }

    const scrollTop = (e.target as HTMLDivElement).scrollTop;

    setIsScrolled(scrollTop > TABLE_ACTIONS_HEIGHT);
  }, []);

  useEffect(
    () =>
      setColumnOrder(
        criteria.fields ?? tableColumns.map((column) => column.id as string)
      ),
    [criteria.fields, tableColumns]
  );

  useEffect(() => {
    setColumnVisibility(
      rawColumns
        .filter((column) => column.element !== CHECKBOX_COLUMN_ID)
        .reduce<VisibilityState>(
          (prev, curr) => ({
            ...prev,
            [curr.element ?? ""]:
              criteria.fields?.includes(curr.element ?? "") ?? false,
          }),
          {}
        )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criteria.fields, JSON.stringify(rawColumns)]);

  useEffect(() => {
    setSorting(
      criteria.sort?.map((s) => ({
        desc: s.desc === 1 || s.desc === "1",
        id: s.field,
      })) ?? []
    );
  }, [criteria.sort]);

  const hasNewRows = newRows.length > 0;

  useEffect(() => {
    if (hasNewRows && !toast.isActive("new-results")) {
      toast({
        duration: 5000,
        id: "new-results",
        isClosable: true,
        onCloseComplete: onResetNewRows,
        position: startIndex > 0 ? "bottom" : "top",
        render: ({ onClose }) => (
          <Box
            alignItems="center"
            bg="purple.200"
            borderRadius="sm"
            display="flex"
            gap="2.5"
            pl="4"
            position="relative"
            pr="10"
            py="4"
          >
            <InfoCircleIcon />
            <Text color="purple.400" fontWeight="semibold">
              <Text as="span" color="purple.500">
                NEW
              </Text>{" "}
              results update.
            </Text>
            {startIndex > 0 && (
              <Button
                bg="purple.300"
                borderRadius="sm"
                color="white"
                fontWeight="semibold"
                height="auto"
                px="1.5"
                py="0.5"
                variant="unstyled"
                onClick={() =>
                  rowVirtualizer.scrollToIndex(0, { smoothScroll: true })
                }
              >
                Scroll to Top
              </Button>
            )}
            <IconButton
              aria-label="Close"
              color="purple.300"
              fontSize="xs"
              height="auto"
              icon={<CloseIcon />}
              minW="0"
              position="absolute"
              right="3"
              top="2"
              variant="sm"
              onClick={onClose}
            />
          </Box>
        ),
      });
    }
  }, [hasNewRows, toast, rowVirtualizer, startIndex, onResetNewRows]);

  return isViewsLoading ? (
    <Flex alignItems="center" h="full" justifyContent="center">
      <CircularProgress isIndeterminate color="gray.500" />
    </Flex>
  ) : (
    <>
      <Flex data-testid="dt" direction="column" h="full">
        <Box
          ref={tableContainerRef}
          data-testid="dt-scrollable"
          flex="1 1 0"
          minH="500px"
          overflow={isLoading ? "hidden" : "auto"}
          onScroll={onTableScroll}
        >
          <Flex
            data-testid="dt-features"
            justify="space-between"
            left="0"
            position="sticky"
            px={8}
            py={4}
            zIndex="dropdown"
          >
            <Flex data-testid="dt-actions" gap={4}>
              {actionRowItems
                ?.filter((item) => item.isVisible)
                ?.map((item) => (
                  <Button key={item.label} onClick={item.onClick}>
                    {item.label}
                  </Button>
                ))}
            </Flex>
            <Flex data-testid="dt-controls" gap={4} justify="end">
              <Menu key="1">
                <MenuButton
                  isDisabled
                  as={Button}
                  data-testid="dt-controls-view"
                  rightIcon={<DropdownIcon />}
                  textAlign="left"
                  w={60}
                >
                  {activeView ? activeView.name : "Select View"}
                </MenuButton>
                <MenuList borderRadius={2} w={60} zIndex="dropdown">
                  <MenuOptionGroup
                    title="Saved Views"
                    type="radio"
                    value={activeView?.viewId?.toString()}
                  >
                    {views.map((view) => (
                      <MenuItemOption
                        key={view.viewId}
                        value={view.viewId?.toString()}
                        onClick={() => onChangeView(view)}
                      >
                        {view.name}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              <IconButton
                aria-label="Edit View"
                data-testid="dt-controls-edit-view"
                icon={<PencilIcon />}
              />
              <IconButton
                aria-label="Schedule"
                data-testid="dt-controls-schedule"
                icon={<ScheduleIcon />}
              />
              <Button
                data-testid="dt-controls-select-columns"
                onClick={() => setColumnsSelectorOpened(true)}
              >
                Select Columns
              </Button>
              <PrintButton />
              <ExportButton
                activeView={activeView}
                totalElements={totalElements}
              />
            </Flex>
          </Flex>

          <Box data-testid="dt-content" position="relative">
            <TableContainer
              h={`${rowVirtualizer.getTotalSize()}px`}
              overflowX="unset"
              overflowY="unset"
              position="relative"
            >
              <Table size="sm" variant="grid">
                <DataTableHeader isScrolled={isScrolled} />
                <DataTableBody
                  hasNextPage={hasNextPage}
                  isAdditionalColumnVisible={isAdditionalColumnVisible}
                  newRows={newRows}
                  rows={rows}
                  virtualRows={virtualRows}
                />
              </Table>
            </TableContainer>

            {startIndex > SCROLL_TO_TOP_AVAILABLE_AT && (
              <Button
                bottom={12}
                data-testid="dt-back-to-top"
                leftIcon={<ChevronUpIcon />}
                opacity={0.67}
                position="fixed"
                right={12}
                onClick={() =>
                  rowVirtualizer.scrollToIndex(0, { smoothScroll: true })
                }
              >
                Back to Top
              </Button>
            )}
          </Box>

          {columnsSelectorOpened && (
            <SelectColumns<TData>
              isOpen
              columns={manageableColumns}
              onClose={() => setColumnsSelectorOpened(false)}
            />
          )}

          {isLoading && (
            <Flex
              align="center"
              bgColor="blackAlpha.200"
              bottom="0"
              justify="center"
              left="0"
              position="absolute"
              right="0"
              top="0"
              zIndex="top"
            >
              <CircularProgress isIndeterminate color="gray.500" />
            </Flex>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default memo(DataTable) as typeof DataTable;
