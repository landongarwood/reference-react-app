import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { SearchSortType } from "../../../types";

export const useInfiniteSearchResults = (
  accountCode?: string,
  criteria: string = "{}",
  sort: SearchSortType = "parts_sold",
  term?: string
) => {
  return useInfiniteQuery(
    [QUERY_KEYS["search-results"], accountCode, criteria, sort, term],
    ({ pageParam = 1 }) => {
      return SearchResourceService.getSearchResultsUsingGet(
        accountCode,
        criteria,
        pageParam,
        12,
        sort,
        term
      );
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const lastSearchInfo = Array.isArray(lastPage?.searchInfo)
          ? lastPage?.searchInfo[0]
          : null;

        return lastSearchInfo &&
          lastSearchInfo.totalPages &&
          lastSearchInfo.currentPage &&
          lastSearchInfo.totalPages > lastSearchInfo.currentPage
          ? lastSearchInfo.currentPage + 1
          : undefined;
      },
      keepPreviousData: true,
    }
  );
};
