import { Checkbox, useConst } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { isArray, isEmpty } from "lodash";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ViewRes } from "../../../api";
import {
  BOOLEAN_VALUES,
  CHECKBOX_COLUMN_ID,
  TABLE_ACTION_COLUMN_WIDTH,
  TABLE_COLUMNS_MIN_WIDTHS,
} from "../../../constants/dataTable";
import { useCookiesLive, useListCriteria } from "../../../hooks";
import { useListingViews, useListingColumns } from "../../../hooks/api/queries";
import { useGlobalState } from "../../../hooks/store/base";
import {
  ActionColumnItem,
  ActionRowItem,
  AdditionalColumnState,
  Column,
  ColumnType,
  ListingName,
  ListingQueryHook,
} from "../../../types";
import { getFormattedDate } from "../../../utils/datetime";
import { Font } from "../../../utils/font";
import { convertNumberToPercentFormat } from "../../../utils/number";
import DataTable from "../../tables/DataTable";
import { DataTableContextProvider } from "../../tables/DataTable/DataTableContext";

const ListingPage = <TData extends Record<string, any>>({
  listingName,
  additionalColumnId: possibleAdditionalColumnId,
  actionColumnItems = [],
  actionRowItems = [],
  useListingQueryHook,
  identifier,
  isSelectable,
  selectedRows,
  onRowsSelect,
}: {
  actionColumnItems?: ActionColumnItem<TData>[];
  actionRowItems?: ActionRowItem[];
  additionalColumnId?: string;
  identifier: keyof TData;
  listingName: ListingName;
  isSelectable?: boolean;
  selectedRows?: TData[];
  useListingQueryHook: ListingQueryHook;
  onRowsSelect?: (rows: TData[]) => void;
}) => {
  const [lastRowId, setLastRowId] = useState();
  const [accountCode] = useCookiesLive(["accountCode"]);
  const [contentWidthThreshold] = useGlobalState("contentWidthThreshold");
  const [contentWidth] = useGlobalState("contentWidth");
  const [selectedView, setSelectedView] = useState<ViewRes>();
  const columnHelper = useConst(() => createColumnHelper<TData>());
  const [newRows, setNewRows] = useState<TData[]>([]);

  const {
    data: views,
    isLoading: isViewsLoading,
    initialView,
  } = useListingViews(listingName);

  const [additionalColumnState, setAdditionalColumnState] =
    useState<AdditionalColumnState>("subRow");

  const { data: rawColumnsData } = useListingColumns(listingName);
  const rawColumns = useMemo<Column[]>(
    () => [
      ...(isSelectable
        ? [
            {
              element: CHECKBOX_COLUMN_ID,
              label: "",
              type: "checkbox" as ColumnType,
            },
          ]
        : []),
      ...(rawColumnsData
        ?.filter((rc) => !accountCode || (accountCode && !rc.crossAccountOnly))
        ?.map<Column>((rawColumnEntity) => ({
          element: rawColumnEntity.element ?? "",
          label: rawColumnEntity.label ?? "",
          type: (rawColumnEntity.type ?? "text") as ColumnType,
        })) ?? []),
    ],
    [accountCode, rawColumnsData, isSelectable]
  );

  const { criteria, updateColumns, updateFilter, updateSort, setViewCriteria } =
    useListCriteria(rawColumns);

  const {
    data,
    isLoading: isDataLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    refetch,
    isSuccess,
    isFetchedAfterMount,
  } = useListingQueryHook(criteria ?? {});

  useEffect(() => {
    if (isSuccess && identifier) {
      const interval = setInterval(
        () => refetch({ refetchPage: (_, index) => index === 0 }),
        60 * 1000 // refetch every minute
      );

      return () => clearInterval(interval);
    }
  }, [isSuccess, identifier, refetch]);

  useEffect(() => {
    const firstPage = data?.pages?.[0];
    if (firstPage && identifier) {
      const maxIdNum = (
        (firstPage._embedded?.entities ?? []) as TData[]
      ).reduce(
        (prev: any, curr: any) =>
          curr[identifier] > prev ? curr[identifier] : prev,
        0
      );

      if (!lastRowId) {
        // first fetch. save the max id.
        setLastRowId(maxIdNum);
      } else if (maxIdNum > lastRowId) {
        // after refetchrefetch. check saved max id with the latest one. if latest one > saved id, new rows are fetched.
        const newRows = (firstPage._embedded?.entities as TData[]).filter(
          (row) => row[identifier] > lastRowId
        );
        setNewRows(newRows);
        setLastRowId(maxIdNum);
      }
    }
  }, [data?.pages, identifier, lastRowId]);

  useEffect(() => {
    if ((!criteria || isEmpty(criteria)) && initialView?.gridFilters) {
      setViewCriteria(initialView?.gridFilters);
    }
  }, [criteria, setViewCriteria, initialView?.gridFilters]);

  const totalElements = useMemo(
    () =>
      data && data.pages && data.pages.length > 0
        ? data.pages[0].page?.totalElements ?? 0
        : 0,
    [data]
  );

  const additionalColumnId = useMemo<string | undefined>(() => {
    const additionalColumn = rawColumns.find(
      (rawColumn) => rawColumn.element === possibleAdditionalColumnId
    );
    if (additionalColumn !== undefined && additionalColumnState === "subRow") {
      return additionalColumn.element;
    }

    return undefined;
  }, [rawColumns, additionalColumnState, possibleAdditionalColumnId]);

  const tableColumns = useMemo<ColumnDef<TData, unknown>[]>(() => {
    const getColumnsWidthTotal = (columns: Column[]) =>
      columns.reduce(
        (prev, curr) => prev + columnsTextWidth[curr.element ?? ""],
        0
      );

    const rawColumnsWithoutSecondRow = rawColumns.filter(
      (column) => column.element !== additionalColumnId
    );

    const columnsTextWidth = rawColumnsWithoutSecondRow.reduce<
      Record<string, number>
    >(
      (prev, { element, label, type }) => ({
        ...prev,
        [element]:
          element === CHECKBOX_COLUMN_ID
            ? 36
            : Math.max(
                Font.getTextWidth(label?.toUpperCase() ?? "", "14px", "500") +
                  32,
                TABLE_COLUMNS_MIN_WIDTHS[type] * 16
              ),
      }),
      {}
    );
    const visibleColumns = rawColumnsWithoutSecondRow.filter(
      (column) =>
        criteria?.fields?.includes(column.element ?? "") ||
        column.element === CHECKBOX_COLUMN_ID
    );
    const fixedWidthColumns = visibleColumns.filter(
      (column) => column.type === "boolean" || column.type === "checkbox"
    );
    const totalColumnsWidthTotal =
      getColumnsWidthTotal(visibleColumns) +
      (actionColumnItems.length > 0 ? TABLE_ACTION_COLUMN_WIDTH : 0);

    let increasable = 0;
    if (contentWidth - contentWidthThreshold - totalColumnsWidthTotal > 0) {
      increasable =
        (contentWidth - contentWidthThreshold - totalColumnsWidthTotal) /
        (visibleColumns.length - fixedWidthColumns.length);
    }

    return rawColumns.map(({ element, label, type }) => {
      let columnWidth = columnsTextWidth[element ?? ""];
      if (type !== "boolean" && type !== "checkbox") {
        columnWidth = columnWidth + increasable;
      }

      return columnHelper.accessor<any, any>(element as any, {
        cell: (info) => {
          let value = info.getValue();
          switch (type) {
            case "multiText":
              value = isArray(value) ? value.join(", ") : value;
              break;
            case "boolean":
              value =
                typeof value === "boolean"
                  ? BOOLEAN_VALUES[value ? "true" : "false"]
                  : value;
              break;
            case "date":
              value = getFormattedDate(value);
              break;
            case "currency":
              const numericValue =
                typeof value === "number" ? value : parseFloat(value ?? "0");
              value =
                "$" +
                numericValue.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                });
              break;
            case "percentage":
              value =
                typeof value === "number"
                  ? convertNumberToPercentFormat(value)
                  : value;
              break;
            case "checkbox":
              value = (
                <Checkbox
                  isChecked={info.row.getIsSelected()}
                  isDisabled={!info.row.getCanSelect()}
                  isIndeterminate={info.row.getIsSomeSelected()}
                  onChange={info.row.getToggleSelectedHandler()}
                />
              );
              break;
            default:
              break;
          }
          if (!value) {
            value = <>&ndash;</>;
          }

          return value;
        },
        footer: (info) => info.column.id,
        header:
          element === CHECKBOX_COLUMN_ID
            ? ({ table }) => (
                <Checkbox
                  isChecked={table.getIsAllRowsSelected()}
                  isIndeterminate={table.getIsSomeRowsSelected()}
                  onChange={table.getToggleAllRowsSelectedHandler()}
                />
              )
            : label,
        id: element,
        meta: type,
        size: columnWidth,
      });
    });
  }, [
    actionColumnItems,
    additionalColumnId,
    columnHelper,
    contentWidth,
    contentWidthThreshold,
    criteria?.fields,
    rawColumns,
  ]);

  const tableData = useMemo(
    () =>
      data?.pages.flatMap<TData>(
        (page) => (page._embedded?.entities as TData[]) ?? []
      ) ?? [],
    [data?.pages]
  );

  const onChangeView = useCallback(
    (view?: ViewRes) => {
      setSelectedView(view);
      setViewCriteria(view?.gridFilters);
    },
    [setViewCriteria]
  );

  return criteria && !isEmpty(criteria) ? (
    <DataTableContextProvider<TData>
      actionColumnItems={actionColumnItems}
      additionalColumnId={additionalColumnId}
      additionalColumnState={additionalColumnState}
      criteria={criteria}
      identifier={identifier}
      listingName={listingName}
      possibleAdditionalColumnId={possibleAdditionalColumnId}
      rawColumns={rawColumns}
      setAdditionalColumnState={setAdditionalColumnState}
      tableColumns={tableColumns}
      tableData={tableData}
      updateColumns={updateColumns}
      updateFilter={updateFilter}
      updateSort={updateSort}
    >
      <DataTable<TData>
        actionRowItems={actionRowItems}
        activeView={selectedView ?? initialView}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={!isFetchedAfterMount && (isRefetching || isDataLoading)}
        isSelectable={isSelectable ?? false}
        isViewsLoading={isViewsLoading}
        newRows={newRows}
        selectedRows={selectedRows}
        totalElements={totalElements}
        views={views?._embedded?.entities ?? []}
        onChangeView={onChangeView}
        onFetchNextPage={fetchNextPage}
        onResetNewRows={() => setNewRows([])}
        onRowsSelect={onRowsSelect}
      />
    </DataTableContextProvider>
  ) : null;
};

export default memo(ListingPage) as typeof ListingPage;
