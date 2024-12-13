import { useInfiniteQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import {
  RestCollection_StaffListing_,
  StaffResourceService,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListingQueryHook, ListCriteria } from "../../../types";

export const useInfiniteStaffList: ListingQueryHook<
  RestCollection_StaffListing_
> = (criteria: ListCriteria, pageSize: number = 100) => {
  return useInfiniteQuery(
    [QUERY_KEYS["staff-list"], criteria],
    ({ pageParam = 1 }) => {
      return StaffResourceService.listUsingGet23(
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
