import { useMutation } from "@tanstack/react-query";
import {
  InvoiceDetailsEmailRequestDto,
  InvoicesResourceService,
} from "../../../api";

export const useInvoiceEmail = () => {
  return useMutation((payload: InvoiceDetailsEmailRequestDto) =>
    InvoicesResourceService.sendInvoiceDetailsEmailUsingPost(payload)
  );
};
