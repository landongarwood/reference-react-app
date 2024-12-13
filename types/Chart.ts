export type PurchaseAnalysisChartConfigKey =
  | "spendByCategory"
  | "spendByManufacturer"
  | "spendByState"
  | "yearOverYearSpend"
  | "spendByLocation"
  | "popularProducts"
  | "savingsByCategory"
  | "savingsByManufacturer";

export type PurchaseAnalysisChartOption1 = {
  startDate?: string;
  endDate?: string;
  period?: string;
  allTime?: boolean;
  custom?: boolean;
};

export type PurchaseAnalysisChartOption2 = "monthly" | "quarterly";
