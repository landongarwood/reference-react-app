import {
  format,
  getQuarter,
  getYear,
  startOfQuarter,
  startOfYear,
  subMonths,
  endOfYesterday,
  endOfQuarter,
  endOfYear,
} from "date-fns";
import { PurchaseAnalysisChartOption1 } from "../types";

export const AREA_CHART_COLORS = [
  "#76C270",
  "#C8897C",
  "#9A96E1",
  "#709EC2",
  "#DBB47E",
  "#72A7B3",
];

export const CHART_COLORS = [
  "#2FA4DE",
  "#76C270",
  "#DB7F7E",
  "#F0B848",
  "#B6B4DE",
  "#00C4A1",
  "#8DD1E1",
  "#839AA2",
  "#EFF048",
  "#F797D8",
  "#CCE3E3",
  "#C8897C",
  "#DBB47E",
  "#F07548",
  "#BADEB4",
];

const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

const today = new Date();
export const CHART_DATE_FILTER_OPTIONS: PurchaseAnalysisChartOption1[] = [
  {
    endDate: formatDate(endOfYesterday()),
    period: "Last 3 Months",
    startDate: formatDate(subMonths(today, 3)),
  },
  {
    endDate: formatDate(endOfYesterday()),
    period: "Last 12 Months",
    startDate: formatDate(subMonths(today, 12)),
  },
  {
    endDate: formatDate(endOfQuarter(today)),
    period: `Q${getQuarter(today)} ${getYear(today)}`,
    startDate: formatDate(startOfQuarter(today)),
  },
  {
    endDate: formatDate(endOfYear(today)),
    period: "Year to Date",
    startDate: formatDate(startOfYear(today)),
  },
  {
    allTime: true,
    period: "All Time",
  },
  {
    custom: true,
    period: "Custom",
  },
];
