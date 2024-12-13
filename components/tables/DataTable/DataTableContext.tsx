import { ColumnDef, Table } from "@tanstack/react-table";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ViewRes } from "../../../api";
import {
  ActionColumnItem,
  AdditionalColumnState,
  Column,
  ListingName,
  ListCriteria,
  UseListCriteriaReturnValues,
} from "../../../types";

type ContextState<TData extends Record<string, any>> = {
  tableColumns: ColumnDef<TData, unknown>[];
  rawColumns: Column[];
  tableData: TData[];
  view?: ViewRes;
  listingName?: ListingName;
  actionColumnItems?: ActionColumnItem<TData>[];
  additionalColumnId?: string;
  possibleAdditionalColumnId?: string;
  table?: Table<TData>;
  setTable: (table: Table<TData>) => void;
  filterFocusedColumnId: string;
  setFilterFocusedColumnId: (value: string) => void;
  criteria: ListCriteria;
  hasActionColumn: boolean;
  additionalColumnState: AdditionalColumnState;
  setAdditionalColumnState: Dispatch<SetStateAction<AdditionalColumnState>>;
  identifier?: keyof TData;
} & Omit<UseListCriteriaReturnValues, "criteria" | "setViewCriteria">;

const DataTableContext = createContext<ContextState<any>>({
  additionalColumnState: "subRow",
  criteria: {},
  filterFocusedColumnId: "",
  hasActionColumn: false,
  rawColumns: [],
  setAdditionalColumnState: () => {},
  setFilterFocusedColumnId: () => {},
  setTable: () => {},
  tableColumns: [],
  tableData: [],
  updateColumns: () => {},
  updateFilter: () => {},
  updateSort: () => {},
});

export const DataTableContextProvider = <TData extends Record<string, any>>({
  children,
  tableColumns,
  tableData,
  rawColumns,
  view,
  criteria,
  updateColumns,
  updateFilter,
  updateSort,
  listingName,
  additionalColumnId,
  possibleAdditionalColumnId,
  actionColumnItems = [],
  additionalColumnState,
  setAdditionalColumnState,
  identifier,
}: {
  children: ReactNode | ReactNode[];
} & Pick<
  ContextState<TData>,
  | "tableColumns"
  | "rawColumns"
  | "tableData"
  | "view"
  | "listingName"
  | "actionColumnItems"
  | "additionalColumnId"
  | "possibleAdditionalColumnId"
  | "actionColumnItems"
  | "updateColumns"
  | "updateFilter"
  | "updateSort"
  | "actionColumnItems"
  | "additionalColumnState"
  | "setAdditionalColumnState"
> & {
    criteria: ListCriteria;
    identifier?: keyof TData;
  }) => {
  const [table, setTable] = useState<Table<TData>>();
  const [filterFocusedColumnId, setFilterFocusedColumnId] = useState("");
  const hasActionColumn = actionColumnItems.length > 0;

  return (
    <DataTableContext.Provider
      value={{
        actionColumnItems,
        additionalColumnId,
        additionalColumnState,
        criteria,
        filterFocusedColumnId,
        hasActionColumn,
        identifier,
        listingName,
        possibleAdditionalColumnId,
        rawColumns,
        setAdditionalColumnState,
        setFilterFocusedColumnId,
        setTable,
        table,
        tableColumns,
        tableData,
        updateColumns,
        updateFilter,
        updateSort,
        view,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};

export const useDataTableContext = () => useContext(DataTableContext);
