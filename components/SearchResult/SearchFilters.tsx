import { Text, VStack } from "@chakra-ui/layout";
import { useMemo } from "react";
import { FacetsResultsResponseDto } from "../../api";
import { useCookiesLive } from "../../hooks";
import { useSearchFacets } from "../../hooks/api/queries";
import { buildCriteriaFromFacets } from "../../utils/searchFacet";
import { SearchFacets } from "./SearchFacets";
import { useSearchResultsContext } from "./SearchResultsContext";

export const SearchFilters = () => {
  const [accountCode] = useCookiesLive(["accountCode"]);
  const { terms, selectedFacets } = useSearchResultsContext();

  const { data } = useSearchFacets({
    accountCode,
    criteria: buildCriteriaFromFacets(selectedFacets),
    term: terms,
  });

  const visibleFacetsList = useMemo(() => {
    return [
      ...(accountCode
        ? [
            {
              facetType: "standards",
              facets: data?.standards ?? [],
              title: "Standards",
            },
          ]
        : []),
      {
        facetType: "quantities",
        facets: [
          {
            fieldName: "availability",
            header: "QUANTITY",
            min: 1,
          },
        ],
        title: "Available (In Stock)",
      },
      {
        facetType: "categories",
        facets: data?.categories ?? [],
        title: "Category",
      },
      {
        facetType: "manufacturers",
        facets: data?.manufacturers ?? [],
        title: "Manufacturer",
      },
      {
        facetType: "suppliers",
        facets: data?.suppliers ?? [],
        title: "Supplier",
      },
    ];
  }, [accountCode, data]);

  return (
    <>
      <Text fontSize="lg" mb={4}>
        Filter Search
      </Text>
      <VStack align="stretch" data-testid="sr-filters-list" spacing={4}>
        {visibleFacetsList.map(
          ({ facets, facetType, title }) =>
            (facets.length > 0 || facetType === "quantities") && (
              <SearchFacets
                key={`search-facets-${facetType}`}
                facetType={facetType as keyof FacetsResultsResponseDto}
                facets={facets}
                title={title}
              />
            )
        )}
      </VStack>
    </>
  );
};
