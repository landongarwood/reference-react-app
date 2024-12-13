import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { OpenAPI } from "../../../api";

const exportUsingGet = async (invoiceNum: number) => {
  return axios.get(`/service/rest/invoices/${invoiceNum}/export`, {
    baseURL: OpenAPI.BASE,
    headers: {
      ACCEPT: "application/pdf",
      Authorization: `Bearer ${OpenAPI.TOKEN}`,
    },
    responseType: "blob",
  });
};

export const useInvoiceExport = () => {
  return useMutation((invoiceNum: number) => exportUsingGet(invoiceNum));
};
