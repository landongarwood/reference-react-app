import { useQuery } from "@tanstack/react-query";
import {
  DealManagementResourceService,
  RestCollection_DealSolrDto_,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListingMaxIdQueryHook } from "../../../types";
import { getMaxIdCriteria } from "../../../utils/criteria";

export const useDealMaxId: ListingMaxIdQueryHook<
  RestCollection_DealSolrDto_
> = (identifier: string) => {
  const maxIdCriteria = getMaxIdCriteria(identifier);

  return useQuery([QUERY_KEYS["deal-max-id"], identifier], () => {
    return DealManagementResourceService.listUsingGet3(
      JSON.stringify(maxIdCriteria),
      1,
      false,
      true,
      false,
      1
    );
  });
};
