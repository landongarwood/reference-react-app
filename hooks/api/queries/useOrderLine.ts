import { useQuery } from "@tanstack/react-query";
import { OrderLinesResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useOrderLine = (orderId?: string) => {
  return useQuery(
    [QUERY_KEYS["order-line"], orderId],
    () =>
      OrderLinesResourceService.getOrderLineUsingGet(orderId ? +orderId : 0),
    { enabled: !!orderId }
  );
};
