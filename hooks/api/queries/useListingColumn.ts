import { useQuery } from "@tanstack/react-query";
import { ListingColumnResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListingName } from "../../../types";

export const useListingColumns = (listingName: ListingName) => {
  return useQuery([QUERY_KEYS["listing-column-resource"], listingName], () =>
    ListingColumnResourceService.listingsColumnsUsingGet(listingName as any)
  );
};
