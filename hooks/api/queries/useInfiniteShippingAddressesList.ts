import { useInfiniteQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import {
  RestCollection_ShippingAddressListing_,
  ShippingAddressResourceService,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListingQueryHook, ListCriteria } from "../../../types";

export const useInfiniteShippingAddressesList: ListingQueryHook<
  RestCollection_ShippingAddressListing_
> = (criteria: ListCriteria) => {
  return useInfiniteQuery(
    [QUERY_KEYS["shipping-addresses-list"], criteria],
    ({ pageParam = 1 }) => {
      return ShippingAddressResourceService.getShippingAddressesUsingGet(
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
