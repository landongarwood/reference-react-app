export type DateFilterDateValues = {
  option: DateFilterOptionValue;
  date: Date | null;
  duration: string;
  durationPointer: DateFilterPeriodDirection;
  durationUnit: DateFilterPeriodUnitValue;
  startOrEnd: DateFilterStartOrEndOf;
  startOrEndPointer: DateFilterPeriodPointer;
  startOrEndUnit: DateFilterStartOrEndOfPeriod;
};
export type DateFilterFormValues = {
  dates: [DateFilterDateValues, DateFilterDateValues];
};
export type DateFilterOptionValue =
  | ""
  | "today"
  | "yesterday"
  | "tomorrow"
  | "priorbusinessday"
  | "nextbusinessday"
  | "periods-before-after"
  | "start-end-of-periods"
  | "specific-date";
export type DateFilterPeriodDirection = "before" | "after";
export type DateFilterPeriodPointer = "last" | "this" | "next";
export type DateFilterPeriodUnitValue = "days" | "weeks" | "months" | "years";
export type DateFilterStartOrEndOf = "start" | "end";

export type DateFilterStartOrEndOfPeriod =
  | "week"
  | "month"
  | "quarter"
  | "year";
