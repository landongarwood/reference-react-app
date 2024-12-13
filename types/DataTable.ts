export type AdditionalColumnState = "hidden" | "subRow" | "column";

export type Column = {
  element: string;
  label: string;
  type: ColumnType;
};

export type ColumnType =
  | "text"
  | "multiText"
  | "boolean"
  | "integer"
  | "currency"
  | "date"
  | "decimal"
  | "percentage"
  | "time"
  | "checkbox";
