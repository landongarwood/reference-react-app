import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ViewResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ListingName } from "../../../types";

export const useListingViews = (listingName: ListingName) => {
  const { data, ...rest } = useQuery(
    [QUERY_KEYS["listing-views"], listingName],
    () => ViewResourceService.listGridViewsUsingGet(listingName)
  );
  const { view: viewParam } = useParams<{ view?: string }>();

  const initialView = useMemo(() => {
    const views = data?._embedded?.entities;

    return views?.find((view) =>
      viewParam
        ? view.name === viewParam || view.viewId?.toString() === viewParam
        : view.isDefault || view.defaultView
    );
  }, [data?._embedded?.entities, viewParam]);

  return {
    data,
    ...rest,
    initialView,
  };
};
