import { useQuery } from "@tanstack/react-query";
import { TransactionStatisticsResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useMostPopularProducts = (
  startDate?: string,
  endDate?: string,
  accountCode?: string,
  showAll?: boolean
) => {
  return useQuery(
    [
      QUERY_KEYS["most-popular-products"],
      startDate,
      endDate,
      accountCode,
      showAll,
    ],
    () =>
      TransactionStatisticsResourceService.getMostPopularProductsUsingGet(
        endDate!,
        startDate!,
        accountCode,
        showAll
      ),
    { enabled: !!startDate && !!endDate }
  );
};
