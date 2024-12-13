import { format, isValid, parse, startOfToday } from "date-fns";
import {
  DateFilterDateValues,
  DateFilterFormValues,
  DateFilterOptionValue,
  DateFilterPeriodUnitValue,
  DateFilterStartOrEndOfPeriod,
} from "../types";
import { splitNumberAndString } from "./string";

export const calculateTextualRepresentationOfDateRange = ({
  dates,
}: DateFilterFormValues) => {
  return [
    convertDateOptionsIntoTextualRepresentation(dates[0]),
    convertDateOptionsIntoTextualRepresentation(dates[1]),
  ];
};

export const convertDateOptionsIntoTextualRepresentation = (
  dateValues: DateFilterDateValues
) => {
  let result = "";
  switch (dateValues.option) {
    case "today":
      result = "today";
      break;
    case "yesterday":
      result = "yesterday";
      break;
    case "tomorrow":
      result = "tomorrow";
      break;
    case "priorbusinessday":
      result = "priorbusinessday";
      break;
    case "nextbusinessday":
      result = "nextbusinessday";
      break;
    case "periods-before-after":
      if (dateValues.duration) {
        result = `${dateValues.duration}${dateValues.durationUnit}${dateValues.durationPointer}`;
      }
      break;
    case "start-end-of-periods":
      result = `${dateValues.startOrEnd}${dateValues.startOrEndPointer}${dateValues.startOrEndUnit}`;
      break;
    case "specific-date":
      result = format(dateValues.date ?? new Date(), "yyyy-MM-dd");
      break;
    default:
      break;
  }

  return result;
};

export const convertTextualRepresentationIntoDateOptions = (
  value: string
): DateFilterDateValues | undefined => {
  const convertedValues: DateFilterDateValues = {
    date: startOfToday(),
    duration: "",
    durationPointer: "before",
    durationUnit: "days",
    option: "",
    startOrEnd: "start",
    startOrEndPointer: "this",
    startOrEndUnit: "month",
  };

  if (isValidDateString(value)) {
    convertedValues.option = "specific-date";
    convertedValues.date = parseDate(value) || null;
    return convertedValues;
  }

  const validOptions: DateFilterOptionValue[] = [
    "today",
    "yesterday",
    "tomorrow",
    "priorbusinessday",
    "nextbusinessday",
  ];

  if (validOptions.includes(value as DateFilterOptionValue)) {
    convertedValues.option = value as DateFilterOptionValue;
  }

  if (value.endsWith("before") || value.endsWith("after")) {
    const segs = splitNumberAndString(value);
    if (segs?.length === 2) {
      convertedValues.option = "periods-before-after";
      convertedValues.duration = segs[0];
      convertedValues.durationPointer = value.endsWith("before")
        ? "before"
        : "after";
      convertedValues.durationUnit = segs[1].replace(
        convertedValues.durationPointer,
        ""
      ) as DateFilterPeriodUnitValue;
    }
  }

  if (value.startsWith("start") || value.startsWith("end")) {
    convertedValues.option = "start-end-of-periods";
    convertedValues.startOrEnd = value.startsWith("start") ? "start" : "end";
    const seg1 = value.replace("start", "").replace("end", "");
    convertedValues.startOrEndPointer = seg1.startsWith("last")
      ? "last"
      : seg1.startsWith("this")
      ? "this"
      : "next";
    const seg2 = seg1
      .replace("last", "")
      .replace("this", "")
      .replace("next", "");
    convertedValues.startOrEndUnit = seg2 as DateFilterStartOrEndOfPeriod;
  }

  return convertedValues.option ? convertedValues : undefined;
};

export const getFormattedDate = (
  date: Date | string | null | undefined,
  dateFormat: string = "MM/dd/yyyy"
) => {
  const parsedDate = typeof date === "string" ? parseDate(date) : date;
  return parsedDate ? format(parsedDate, dateFormat) : "";
};

export const getMonthName = (monthNumber: number) => {
  const date = new Date(2000, monthNumber - 1, 1);
  // Format the date to get the month in short format (e.g., 'Jan', 'Feb', etc.)
  return format(date, "MMM");
};

export const isValidDateString = (
  value: string,
  format: string = "yyyy-MM-dd"
) => {
  const parsedDate = parseDate(value, format);
  return isValid(parsedDate);
};

export const parseDate = (value?: string, format: string = "yyyy-MM-dd") =>
  value ? parse(value, format, new Date()) : null;
