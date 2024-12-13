import { endOfToday, startOfToday } from "date-fns";
import { UseFormSetValue } from "react-hook-form";
import {
  DateFilterFormValues,
  DateFilterOptionValue,
  DateFilterPeriodDirection,
  DateFilterPeriodPointer,
  DateFilterPeriodUnitValue,
  DateFilterStartOrEndOf,
  DateFilterStartOrEndOfPeriod,
} from "../types";

type DateFilterOption<TValue> = { label: string; value: TValue };

export const DATE_FILTER_FROM_OPTIONS: DateFilterOption<DateFilterOptionValue>[] =
  [
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Yesterday",
      value: "yesterday",
    },
    {
      label: "Prior Business Day",
      value: "priorbusinessday",
    },
    {
      label: "Days/Weeks/Months/Years Before/From Now",
      value: "periods-before-after",
    },
    {
      label: "Start/End of Week/Month/Quarter/Year",
      value: "start-end-of-periods",
    },
    {
      label: "Specific Date",
      value: "specific-date",
    },
  ];
export const DATE_FILTER_OPTIONS: {
  label: string;
  onClick?: (setValue: UseFormSetValue<DateFilterFormValues>) => () => void;
}[] = [
  {
    label: "Range",
    onClick: (setValue) => () => {
      setValue("dates.0.option", "");
      setValue("dates.1.option", "");
    },
  },
  {
    label: "Today",
    onClick: (setValue) => () => {
      setValue("dates.0.option", "today");
      setValue("dates.1.option", "today");
    },
  },
  {
    label: "Yesterday",
    onClick: (setValue) => () => {
      setValue("dates.0.option", "yesterday");
      setValue("dates.1.option", "yesterday");
    },
  },
  {
    label: "Last 7 Days",
    onClick: (setValue) => () => {
      setValue("dates.0.option", "periods-before-after");
      setValue("dates.0.duration", "7");
      setValue("dates.0.durationPointer", "before");
      setValue("dates.0.durationUnit", "days");
      setValue("dates.1.option", "yesterday");
    },
  },
  {
    label: "Last 30 Days",
    onClick: (setValue) => () => {
      setValue("dates.0.option", "periods-before-after");
      setValue("dates.0.duration", "30");
      setValue("dates.0.durationPointer", "before");
      setValue("dates.0.durationUnit", "days");
      setValue("dates.1.option", "yesterday");
    },
  },
  {
    label: "This Month",
    onClick: (setValue) => () => {
      setValue("dates.0.option", "start-end-of-periods");
      setValue("dates.0.startOrEnd", "start");
      setValue("dates.0.startOrEndPointer", "this");
      setValue("dates.0.startOrEndUnit", "month");
      setValue("dates.1.option", "start-end-of-periods");
      setValue("dates.1.startOrEnd", "end");
      setValue("dates.1.startOrEndPointer", "this");
      setValue("dates.1.startOrEndUnit", "month");
    },
  },
  {
    label: "Last Month",
    onClick: (setValue) => () => {
      setValue("dates.0.option", "start-end-of-periods");
      setValue("dates.0.startOrEnd", "start");
      setValue("dates.0.startOrEndPointer", "last");
      setValue("dates.0.startOrEndUnit", "month");
      setValue("dates.1.option", "start-end-of-periods");
      setValue("dates.1.startOrEnd", "end");
      setValue("dates.1.startOrEndPointer", "last");
      setValue("dates.1.startOrEndUnit", "month");
    },
  },
  {
    label: "Today & Beyond",
    onClick: (setValue) => () => {
      setValue("dates.0.option", "today");
      setValue("dates.1.option", "");
    },
  },
  {
    label: "Past",
    onClick: (setValue) => () => {
      setValue("dates.0.option", "");
      setValue("dates.1.option", "yesterday");
    },
  },
  {
    label: "Custom",
    onClick: (setValue) => () => {
      setValue("dates.0.option", "specific-date");
      setValue("dates.0.date", startOfToday());
      setValue("dates.1.option", "specific-date");
      setValue("dates.1.date", endOfToday());
    },
  },
];

export const DATE_FILTER_PERIOD_DIRECTIONS: DateFilterOption<DateFilterPeriodDirection>[] =
  [
    { label: "Before", value: "before" },
    { label: "From Now", value: "after" },
  ];

export const DATE_FILTER_PERIOD_OPTIONS: DateFilterOption<DateFilterPeriodUnitValue>[] =
  [
    {
      label: "Day(s)",
      value: "days",
    },
    {
      label: "Week(s)",
      value: "weeks",
    },
    {
      label: "Month(s)",
      value: "months",
    },
    {
      label: "Year(s)",
      value: "years",
    },
  ];

export const DATE_FILTER_START_END_OF_PERIODS: DateFilterOption<DateFilterStartOrEndOfPeriod>[] =
  [
    {
      label: "Week",
      value: "week",
    },
    {
      label: "Month",
      value: "month",
    },
    {
      label: "Quarter",
      value: "quarter",
    },
    {
      label: "Year",
      value: "year",
    },
  ];

export const DATE_FILTER_START_END_OPTIONS: DateFilterOption<DateFilterStartOrEndOf>[] =
  [
    {
      label: "Start of",
      value: "start",
    },
    {
      label: "End of",
      value: "end",
    },
  ];

export const DATE_FILTER_START_END_PERIOD_POINTERS: DateFilterOption<DateFilterPeriodPointer>[] =
  [
    {
      label: "Last",
      value: "last",
    },
    {
      label: "This",
      value: "this",
    },
    {
      label: "Next",
      value: "next",
    },
  ];

export const DATE_FILTER_TO_OPTIONS: DateFilterOption<DateFilterOptionValue>[] =
  [
    {
      label: "",
      value: "",
    },
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Yesterday",
      value: "yesterday",
    },
    {
      label: "Tomorrow",
      value: "tomorrow",
    },
    {
      label: "Next Business Day",
      value: "nextbusinessday",
    },
    {
      label: "Days/Weeks/Months/Years From Now/Before",
      value: "periods-before-after",
    },
    {
      label: "End/Start of Week/Month/Quarter/Year",
      value: "start-end-of-periods",
    },
    {
      label: "Specific Date",
      value: "specific-date",
    },
  ];
