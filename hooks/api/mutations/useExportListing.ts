import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { OpenAPI } from "../../../api";
import { EXPORT_LISTING_CONTENT_TYPES } from "../../../constants/exportListings";
import { ExportListingType } from "../../../types";

interface ExportListingParams {
  exportListingType: ExportListingType;
  listingName: string;
  criteria?: string;
  name?: string;
  page?: number;
  size?: number;
}

const exportListingUsingGet = async ({
  exportListingType,
  listingName,
  criteria = "{}",
  name = "Export",
  page = 1,
  size = 20000,
}: ExportListingParams) => {
  return axios.get(
    `/service/rest/listing/${listingName}/export?criteria=${encodeURIComponent(
      criteria
    )}`,
    {
      baseURL: OpenAPI.BASE,
      headers: {
        Accept: EXPORT_LISTING_CONTENT_TYPES[exportListingType],
        Authorization: `Bearer ${OpenAPI.TOKEN}`,
      },
      params: {
        name,
        page,
        size,
      },
      responseType: "blob",
    }
  );
};

export const useExportListing = () => {
  return useMutation((params: ExportListingParams) =>
    exportListingUsingGet(params)
  );
};
