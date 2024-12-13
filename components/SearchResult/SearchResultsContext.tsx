import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { FacetValueDto, SearchFieldStatsDto } from "../../api";
import usePageTitle from "../../hooks/store/usePageTitle";
import { SearchSortType } from "../../types";
import { isFacetsEqual } from "../../utils/searchFacet";

type ContextState = {
  selectedFacets: (FacetValueDto | SearchFieldStatsDto)[];
  toggleSearchFacet: (
    facet: FacetValueDto | SearchFieldStatsDto,
    checked: boolean
  ) => void;
  terms: string;
  sort: SearchSortType;
  onSortChange: (sort: SearchSortType) => void;
};

const SearchResultsContext = createContext<ContextState>({
  onSortChange: () => {},
  selectedFacets: [],
  sort: "parts_sold",
  terms: "",
  toggleSearchFacet: () => {},
});

export const SearchResultsContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [searchParams] = useSearchParams();
  const [, setPageTitle] = usePageTitle();

  const [sort, setSort] = useState<SearchSortType>("parts_sold");
  const [selectedFacets, setSelectedFacets] = useState<
    (FacetValueDto | SearchFieldStatsDto)[]
  >([]);
  const terms = searchParams.get("terms") ?? "";

  const toggleSearchFacet = (
    facet: FacetValueDto | SearchFieldStatsDto,
    checked: boolean
  ) =>
    setSelectedFacets((prevSelectedFacets) => {
      const isFacetSelected = selectedFacets.some((facetEntity) =>
        isFacetsEqual(facetEntity, facet)
      );
      if (checked && !isFacetSelected) {
        return [...prevSelectedFacets, facet];
      }

      if (!checked && isFacetSelected) {
        return prevSelectedFacets.filter(
          (facetEntity) => !isFacetsEqual(facetEntity, facet)
        );
      }

      return prevSelectedFacets;
    });
  const onSortChange = (newSort: SearchSortType) => setSort(newSort);

  useEffect(() => {
    setPageTitle(`Search Results: ${terms}`);
  }, [terms, setPageTitle]);

  return (
    <SearchResultsContext.Provider
      value={{
        onSortChange,
        selectedFacets,
        sort,
        terms,
        toggleSearchFacet,
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
};

export const useSearchResultsContext = () => useContext(SearchResultsContext);
