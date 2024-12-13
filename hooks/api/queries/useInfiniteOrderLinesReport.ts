import { useInfiniteQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import {
  OrderLinesResourceService,
  RestCollection_OrderLineSolrDto_,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListingQueryHook, ListCriteria } from "../../../types";

export const useInfiniteOrderLinesReport: ListingQueryHook<
  RestCollection_OrderLineSolrDto_
> = (criteria: ListCriteria) => {
  return useInfiniteQuery(
    [QUERY_KEYS["order-line-report"], criteria],
    ({ pageParam = 1 }) => {
      return OrderLinesResourceService.listUsingGet11(
        JSON.stringify(criteria),
        pageParam,
        true,
        false,
        false,
        100
      );
    },
    {
      enabled: !isEmpty(criteria),
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
