import { useInfiniteQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import {
  ProductsResourceService,
  RestCollection_ManufacturerProductSolrDto_,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListingQueryHook, ListCriteria } from "../../../types";

export const useInfiniteProductsReport: ListingQueryHook<
  RestCollection_ManufacturerProductSolrDto_
> = (criteria: ListCriteria) => {
  return useInfiniteQuery(
    [QUERY_KEYS["product-report"], criteria],
    ({ pageParam = 1 }) => {
      return ProductsResourceService.listUsingGet13(
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
