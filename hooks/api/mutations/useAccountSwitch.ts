import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getAppLink } from "../../../utils/link";

export const useAccountSwitch = () => {
  return useMutation((accountCode: string | null) => {
    const formData = new FormData();
    formData.append("account", String(accountCode));
    return axios.post<{ errorMessage: string }>(
      getAppLink("/app/Auth/accountSwitch"),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  });
};
