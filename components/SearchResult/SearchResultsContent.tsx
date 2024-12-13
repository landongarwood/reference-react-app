import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { Select } from "@chakra-ui/select";
import { useVirtualizer } from "@tanstack/react-virtual";
import { get } from "lodash";
import { ChangeEvent, Fragment, useEffect, useMemo, useRef } from "react";
import { ManufacturerPartSearchResultDto } from "../../api";
import {
  SearchResultEntity,
  SearchFilters,
  useSearchResultsContext,
} from "../../components/SearchResult";
import {
  SEARCH_RESULT_ENTITY_HEIGHT,
  SEARCH_RESULT_ENTITY_SPACING,
  SEARCH_RESULT_OVERSCAN,
  SEARCH_RESULT_SCROLL_TO_TOP_AVAILABLE_AT,
} from "../../constants/searchResults";
import { useCookiesLive } from "../../hooks";
import { useInfiniteSearchResults } from "../../hooks/api/queries";
import { SearchSortType } from "../../types";
import { buildCriteriaFromFacets } from "../../utils/searchFacet";
import { ChevronUpIcon } from "../icons";

export const SearchResultsContent = () => {
  const [accountCode] = useCookiesLive(["accountCode"]);
  const { sort, terms, selectedFacets, onSortChange } =
    useSearchResultsContext();

  const searchResultsRef = useRef<HTMLDivElement | null>(null);
  const criteria = buildCriteriaFromFacets(selectedFacets);

  const {
    data,
    isLoading: isDataLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteSearchResults(
    accountCode,
    JSON.stringify(criteria),
    sort,
    terms
  );

  const isLoading = isDataLoading || (isFetching && !isFetchingNextPage);

  const rows = useMemo(
    () =>
      data?.pages.flatMap<ManufacturerPartSearchResultDto>(
        (page) => page?.results ?? []
      ) ?? [],
    [data?.pages]
  );

  const rowVirtualizer = useVirtualizer<any, any>({
    count: hasNextPage ? rows.length + 1 : rows.length,
    estimateSize: () =>
      SEARCH_RESULT_ENTITY_HEIGHT + SEARCH_RESULT_ENTITY_SPACING,
    getScrollElement: () => searchResultsRef.current,
    overscan: SEARCH_RESULT_OVERSCAN,
  });

  const { startIndex } = (rowVirtualizer as any).range;
  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...virtualRows].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= rows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    rows.length,
    virtualRows,
  ]);

  const totalCount = useMemo(
    () => get(data, "pages[0].searchInfo[0].numFound"),
    [data]
  );

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) =>
    onSortChange(event.target.value as SearchSortType);

  return (
    <Flex data-testid="sr-container" gap={6} h="full">
      <Box h="full" pt={12} w={300}>
        <SearchFilters />
      </Box>
      <Box flex="1" h="full" overflow="hidden" px={2}>
        <Flex
          alignItems="center"
          data-testid="sr-controls"
          justify="space-between"
        >
          <Text data-testid="sr-pagination-result" fontSize="sm">
            {totalCount
              ? `Showing 1-${rows.length} of ${totalCount}`
              : `No results found`}
          </Text>

          <Box alignItems="center" display="flex" gap={4}>
            <Text fontSize="sm">Sort By:</Text>
            <Select
              data-testid="sr-sort-dropdown"
              size="sm"
              value={sort}
              w={170}
              onChange={handleSortChange}
            >
              <option value="account_standards">Account Standards</option>
              <option value="manufacturer_asc">Manufacturer Asc</option>
              <option value="manufacturer_desc">Manufacturer Desc</option>
              <option value="parts_sold">Parts Sold</option>
              <option value="price_asc">Price Asc</option>
              <option value="price_desc">Price Desc</option>
            </Select>
          </Box>
        </Flex>
        <Flex data-testid="sr-results" direction="column" h="full" py={4}>
          <Box
            ref={searchResultsRef}
            data-testid="sr-scrollable"
            flex="1 1 0"
            minH="500px"
            overflow={isLoading ? "hidden" : "auto"}
            px={1}
          >
            <Box data-testid="sr-content" position="relative">
              <Box
                h={`${rowVirtualizer.getTotalSize()}px`}
                overflowX="unset"
                overflowY="unset"
                position="relative"
              >
                {virtualRows.map((virtualRow) => {
                  const isLoaderRow = virtualRow.index > rows.length - 1;
                  const row = rows[virtualRow.index];

                  return (
                    <Fragment key={virtualRow.index}>
                      {isLoaderRow ? (
                        <>loading</>
                      ) : (
                        <Box
                          bgColor="white"
                          borderColor="rgba(223, 222, 223, 0.1)"
                          borderWidth={1}
                          boxShadow="1px 2px 8px 0 rgba(0, 0, 0, 0.15)"
                          h={virtualRow.size - SEARCH_RESULT_ENTITY_SPACING}
                          left={0}
                          position="absolute"
                          top={0}
                          transform={`translateY(${virtualRow.start}px)`}
                          width="100%"
                        >
                          <SearchResultEntity entity={row} />
                        </Box>
                      )}
                    </Fragment>
                  );
                })}
              </Box>

              {startIndex > SEARCH_RESULT_SCROLL_TO_TOP_AVAILABLE_AT && (
                <Button
                  bottom={12}
                  data-testid="sr-back-to-top"
                  leftIcon={<ChevronUpIcon />}
                  opacity={0.67}
                  position="fixed"
                  right={12}
                  onClick={() =>
                    rowVirtualizer.scrollToIndex(0, { smoothScroll: true })
                  }
                >
                  Back to Top
                </Button>
              )}
            </Box>
            {isLoading && (
              <Flex
                align="center"
                bgColor="blackAlpha.200"
                bottom="0"
                justify="center"
                left="0"
                position="absolute"
                right="0"
                top="0"
                zIndex="top"
              >
                <CircularProgress isIndeterminate color="gray.500" />
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
