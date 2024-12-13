import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import {
  RestCollection_ManufacturerProductSolrDto_,
  RestCollection_StaffListing_,
  RestCollection_OrderLineSolrDto_,
} from "../api";
import { ListCriteria } from "./ListCriteria";

type RestCollection =
  | RestCollection_ManufacturerProductSolrDto_
  | RestCollection_StaffListing_
  | RestCollection_OrderLineSolrDto_;

export type ListingMaxIdQueryHook<TData = RestCollection, TError = unknown> = (
  identifier: string
) => UseQueryResult<TData, TError>;

export type ListingQueryHook<TData = RestCollection, TError = unknown> = (
  criteria: ListCriteria
) => UseInfiniteQueryResult<TData, TError>;
