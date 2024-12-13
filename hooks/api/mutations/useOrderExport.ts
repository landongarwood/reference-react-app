import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { OpenAPI } from "../../../api";

const exportUsingGet = async (orderNum: number) => {
  return axios.get(`/service/rest/orders/${orderNum}/export`, {
    baseURL: OpenAPI.BASE,
    headers: {
      ACCEPT: "application/pdf",
      Authorization: `Bearer ${OpenAPI.TOKEN}`,
    },
    responseType: "blob",
  });
};

export const useOrderExport = () => {
  return useMutation((orderNum: number) => exportUsingGet(orderNum));
};
