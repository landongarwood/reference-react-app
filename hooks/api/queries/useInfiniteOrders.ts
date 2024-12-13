import { useInfiniteQuery } from "@tanstack/react-query";
import {
  OrdersResourceService,
  RestCollection_OrderListing_,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListingQueryHook, ListCriteria } from "../../../types";

export const useInfiniteOrders: ListingQueryHook<
  RestCollection_OrderListing_
> = (criteria: ListCriteria) => {
  return useInfiniteQuery(
    [QUERY_KEYS["product-report"], criteria],
    ({ pageParam = 1 }) => {
      return OrdersResourceService.listUsingGet12(
        JSON.stringify(criteria),
        pageParam
      );
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page?.totalPages &&
          allPages.length < lastPage.page?.totalPages
          ? allPages.length + 1
          : undefined;
      },
      keepPreviousData: true,
    }
  );
};
