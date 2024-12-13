import {
  FacetsResultsResponseDto,
  FacetValueDto,
  SearchFieldStatsDto,
} from "../api";
import { CriteriaField, ListCriteria } from "../types";

const ValueFacetAttributes = [
  "attributes",
  "categories",
  "manufacturers",
  "standards",
  "suppliers",
];
const SearchFacetAttributes = ["prices", "quantities"];
const ValueFacetHeaders = [
  "ATTRIBUTE",
  "CATEGORY",
  "MANUFACTURER",
  "STANDARDS",
  "SUPPLIER",
];
const SearchFacetHeaders = ["PRICE", "QUANTITY"];

export const buildCriteriaFromFacets = (
  facets: (FacetValueDto | SearchFieldStatsDto)[]
): ListCriteria => {
  const valueFacets: FacetValueDto[] = facets.filter((facet) =>
    ValueFacetHeaders.includes(facet.header ?? "")
  );
  const searchFacets: SearchFieldStatsDto[] = facets.filter((facet) =>
    SearchFacetHeaders.includes(facet.header ?? "")
  );
  const eqField = valueFacets.reduce<CriteriaField>(
    (prev, cur) => ({
      ...prev,
      [cur.fieldName ?? ""]: [
        ...(prev[cur.fieldName ?? ""] ?? []),
        cur.value ?? "",
      ],
    }),
    {}
  );
  const geField = searchFacets.reduce<CriteriaField>(
    (prev, cur) => ({
      ...prev,
      ...(cur.min
        ? {
            [cur.fieldName ?? ""]: [
              ...(prev[cur.fieldName ?? ""] ?? []),
              cur.min.toString() ?? "",
            ],
          }
        : {}),
    }),
    {}
  );
  const leField = searchFacets.reduce<CriteriaField>(
    (prev, cur) => ({
      ...prev,
      ...(cur.max
        ? {
            [cur.fieldName ?? ""]: [
              ...(prev[cur.fieldName ?? ""] ?? []),
              cur.max.toString() ?? "",
            ],
          }
        : {}),
    }),
    {}
  );

  return {
    eq: Object.keys(eqField).length > 0 ? [eqField] : [{}],
    ge: Object.keys(geField).length > 0 ? [geField] : [{}],
    le: Object.keys(leField).length > 0 ? [leField] : [{}],
  };
};
export const getSearchFacetText = (
  facetType: keyof FacetsResultsResponseDto,
  facet: FacetValueDto | SearchFieldStatsDto
): string => {
  let facetText = "";

  if (ValueFacetAttributes.includes(facetType)) {
    facetText = `${(facet as FacetValueDto).value}`;
  }

  if (SearchFacetAttributes.includes(facetType)) {
    const typedFacet = facet as SearchFieldStatsDto;

    if (
      typeof typedFacet.min === "number" &&
      typeof typedFacet.max === "number"
    ) {
      facetText = `from ${getFacetRangeEntityString(
        typedFacet.min,
        facetType
      )} to ${getFacetRangeEntityString(typedFacet.max, facetType)}`;
    }
    if (
      typeof typedFacet.min !== "number" &&
      typeof typedFacet.max === "number"
    ) {
      facetText = `less than ${getFacetRangeEntityString(
        typedFacet.max,
        facetType
      )}`;
    }
    if (
      typeof typedFacet.min === "number" &&
      typeof typedFacet.max !== "number"
    ) {
      facetText = `Availability of at least ${getFacetRangeEntityString(
        typedFacet.min,
        facetType
      )}`;
    }
  }

  return facetText;
};
export const isFacetsEqual = (
  firstFacet: FacetValueDto | SearchFieldStatsDto,
  secondFacet: FacetValueDto | SearchFieldStatsDto
): boolean => {
  return (
    firstFacet.header === secondFacet.header &&
    firstFacet.fieldName === secondFacet.fieldName &&
    (firstFacet as FacetValueDto).value ===
      (secondFacet as FacetValueDto).value &&
    (firstFacet as SearchFieldStatsDto).min ===
      (secondFacet as SearchFieldStatsDto).min &&
    (firstFacet as SearchFieldStatsDto).max ===
      (secondFacet as SearchFieldStatsDto).max
  );
};

const getFacetRangeEntityString = (
  value: number,
  facetType: keyof FacetsResultsResponseDto
) => {
  if (facetType === "prices") {
    return `$${value.toFixed(2)}`;
  }

  return value;
};
