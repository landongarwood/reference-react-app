import { useInfiniteQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import {
  ListingUsersResourceService,
  RestCollection_ListingUser_,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListCriteria, ListingQueryHook } from "../../../types";

export const useInfiniteUserList: ListingQueryHook<
  RestCollection_ListingUser_
> = (criteria: ListCriteria, pageSize: number = 100) => {
  return useInfiniteQuery(
    [QUERY_KEYS["users"], criteria],
    ({ pageParam = 1 }) => {
      return ListingUsersResourceService.listUsersUsingGet(
        JSON.stringify(criteria),
        pageParam,
        true,
        false,
        false,
        pageSize
      );
    },
    {
      enabled: !isEmpty(criteria),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage._embedded?.entities?.length === pageSize
          ? allPages.length + 1
          : undefined;
      },
      keepPreviousData: true,
    }
  );
};
