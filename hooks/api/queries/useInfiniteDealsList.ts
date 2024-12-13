import { useInfiniteQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import {
  DealManagementResourceService,
  RestCollection_DealSolrDto_,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListCriteria, ListingQueryHook } from "../../../types";

export const useInfiniteDealsList: ListingQueryHook<
  RestCollection_DealSolrDto_
> = (criteria: ListCriteria) => {
  return useInfiniteQuery(
    [QUERY_KEYS["deals-list"], criteria],
    ({ pageParam = 1 }) => {
      return DealManagementResourceService.listUsingGet3(
        JSON.stringify(criteria),
        pageParam,
        true,
        true,
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
