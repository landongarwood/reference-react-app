import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { OpenAPI } from "../../../api";
import { EXPORT_LISTING_CONTENT_TYPES } from "../../../constants/exportListings";
import { ExportListingType } from "../../../types";

interface ExportBlanketPosParams {
  exportListingType: ExportListingType;
  accountId: number;
}
const exportBlanketPosUsingGet = async ({
  exportListingType,
  accountId,
}: ExportBlanketPosParams) => {
  return axios.get("/service/rest/blanketPo/export", {
    baseURL: OpenAPI.BASE,
    headers: {
      Accept: EXPORT_LISTING_CONTENT_TYPES[exportListingType],
      Authorization: `Bearer ${OpenAPI.TOKEN}`,
    },
    params: {
      accountId,
    },
    responseType: "blob",
  });
};

export const useExportBlanketPos = () => {
  return useMutation((params: ExportBlanketPosParams) =>
    exportBlanketPosUsingGet(params)
  );
};
