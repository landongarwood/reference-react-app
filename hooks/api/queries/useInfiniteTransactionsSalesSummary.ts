import { useInfiniteQuery } from "@tanstack/react-query";
import { format, startOfQuarter } from "date-fns";
import { TransactionStatisticsResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { SALES_SUMMARY_ACCOUNTS_PAGE_SIZE } from "../../../constants/salesSummary";

export const useInfiniteTransactionsSalesSummary = () => {
  const endDate = format(new Date(), "yyyy-MM-dd");
  const startDate = format(startOfQuarter(new Date()), "yyyy-MM-dd");

  return useInfiniteQuery(
    [QUERY_KEYS["sales-summary-transactions"]],
    ({ pageParam = 1 }) => {
      return TransactionStatisticsResourceService.getSalesSummaryUsingGet(
        endDate,
        startDate,
        SALES_SUMMARY_ACCOUNTS_PAGE_SIZE + 1,
        SALES_SUMMARY_ACCOUNTS_PAGE_SIZE * (pageParam - 1)
      );
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.accounts &&
          lastPage.accounts?.length > SALES_SUMMARY_ACCOUNTS_PAGE_SIZE
          ? allPages.length + 1
          : undefined;
      },
      keepPreviousData: true,
    }
  );
};
