import { useQuery } from "@tanstack/react-query";
import { InvoicesResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useInvoice = (invoiceNum?: number) => {
  return useQuery(
    [QUERY_KEYS.invoice, invoiceNum],
    () => InvoicesResourceService.readUsingGet1(invoiceNum!),
    { enabled: !!invoiceNum }
  );
};
