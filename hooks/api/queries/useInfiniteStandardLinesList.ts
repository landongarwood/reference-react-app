import { useInfiniteQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import {
  RestCollection_StandardLineSolrDto_,
  StandardLinesResourceService,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListingQueryHook, ListCriteria } from "../../../types";

export const useInfiniteStandardLinesList: ListingQueryHook<
  RestCollection_StandardLineSolrDto_
> = (criteria: ListCriteria) => {
  return useInfiniteQuery(
    [QUERY_KEYS["standard-lines"], criteria],
    ({ pageParam = 1 }) => {
      return StandardLinesResourceService.listUsingGet24(
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
