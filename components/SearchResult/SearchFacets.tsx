import { Button, IconButton } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import { Box, Text, VStack } from "@chakra-ui/layout";
import { Input, Tooltip } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  FacetsResultsResponseDto,
  FacetValueDto,
  SearchFieldStatsDto,
} from "../../api";
import { SEARCH_RESULT_FACETS_TRIMMED_COUNT } from "../../constants/searchResults";
import { getSearchFacetText, isFacetsEqual } from "../../utils/searchFacet";
import { useSearchResultsContext } from "./SearchResultsContext";

export const SearchFacets = ({
  facetType,
  facets = [],
  title,
}: {
  facetType: keyof FacetsResultsResponseDto;
  facets?: Array<FacetValueDto | SearchFieldStatsDto>;
  title: string;
}) => {
  const { selectedFacets, toggleSearchFacet } = useSearchResultsContext();
  const [expanded, setExpanded] = useState(false);
  const [trimmed, setTrimmed] = useState(true);
  const [searchText, setSearchText] = useState("");

  const filteredFacets = useMemo(
    () =>
      (facets ?? []).filter((facet) =>
        getSearchFacetText(facetType, facet)
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase())
      ),
    [facets, searchText, facetType]
  );

  const handleFacetChange = (
    facet: FacetValueDto | SearchFieldStatsDto,
    checked: boolean
  ) => toggleSearchFacet(facet, checked);
  const handleToggleTrimmed = () => setTrimmed((prev) => !prev);

  return (
    <Box
      backgroundColor="gray.100"
      data-testid="sr-result-entity-filter-item"
      overflow={expanded && !trimmed ? "auto" : "hidden"}
      p={2}
    >
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Text
          data-testid="sr-result-entity-filter-item-facet-type-text"
          fontSize="md"
          textTransform="capitalize"
        >
          {title}
        </Text>
        <IconButton
          aria-label="toggle-facets"
          color="black"
          data-testid="sr-result-entity-filter-item-facet-toggle-button"
          icon={expanded ? <MinusIcon /> : <AddIcon />}
          variant="link"
          onClick={() => setExpanded((prev) => !prev)}
        />
      </Box>
      {expanded && facets.length > 1 && (
        <Input
          placeholder="Search filters..."
          size="sm"
          value={searchText}
          width="100%"
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      {expanded && (
        <VStack
          align="stretch"
          data-testid="sr-result-entity-filter-item-facets-list"
          maxHeight={96}
          mt={1}
          overflow="auto"
          paddingLeft="1.5rem"
          px={2}
        >
          {filteredFacets
            .slice(
              0,
              trimmed
                ? SEARCH_RESULT_FACETS_TRIMMED_COUNT
                : filteredFacets.length
            )
            .map((facet: FacetValueDto | SearchFieldStatsDto) => {
              const facetText = getSearchFacetText(facetType, facet);
              const trimmedFacetText =
                facetText.length > 26
                  ? facetText.substring(0, 26) + "..."
                  : facetText;
              const isChecked = selectedFacets.some((facetEntity) =>
                isFacetsEqual(facetEntity, facet)
              );

              return (
                <Checkbox
                  key={`facet-entity-${facetType}-${
                    (facet as FacetValueDto).value
                  }-${(facet as SearchFieldStatsDto).min}-${
                    (facet as SearchFieldStatsDto).max
                  }`}
                  data-testid="sr-result-entity-filter-item-facet-checkbox"
                  isChecked={isChecked}
                  onChange={(e) => handleFacetChange(facet, e.target.checked)}
                >
                  <Tooltip
                    shouldWrapChildren
                    label={facetText}
                    placement="right"
                  >
                    <Text
                      data-testid="sr-result-entity-filter-item-facet-value"
                      fontSize="sm"
                    >
                      {trimmedFacetText} {facet.count ? `(${facet.count})` : ""}
                    </Text>
                  </Tooltip>
                </Checkbox>
              );
            })}
        </VStack>
      )}
      {expanded &&
        filteredFacets.length > SEARCH_RESULT_FACETS_TRIMMED_COUNT && (
          <Box display="flex" justifyContent="end">
            <Button
              color="blue.600"
              data-testid="sr-result-entity-filter-item-trim-button"
              rightIcon={trimmed ? <ChevronDownIcon /> : <ChevronUpIcon />}
              size="sm"
              variant="link"
              onClick={handleToggleTrimmed}
            >
              {trimmed ? "Show More" : "Show Less"}
            </Button>
          </Box>
        )}
    </Box>
  );
};
