import { useQuery } from "@tanstack/react-query";
import { ListingsFacetResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListingName, ListCriteria } from "../../../types";

type FacetSort = "Alphabetical" | "Count";

export const useListingFacets = ({
  column,
  listingName,
  criteria,
  facetSort,
  term,
  enabled,
}: {
  column: string;
  listingName: ListingName;
  criteria?: ListCriteria;
  facetSort?: FacetSort;
  term?: string;
  enabled?: boolean;
}) => {
  return useQuery(
    [
      QUERY_KEYS["listing-facets"],
      column,
      listingName,
      criteria,
      facetSort,
      term,
    ],
    () =>
      ListingsFacetResourceService.listingsFacetUsingGet(
        column,
        listingName,
        JSON.stringify(criteria),
        facetSort,
        1,
        50,
        term
      ),
    { enabled }
  );
};
