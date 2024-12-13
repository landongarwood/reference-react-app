import { useQuery } from "@tanstack/react-query";
import { OrdersResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useOrder = (orderNum?: number) => {
  return useQuery(
    [QUERY_KEYS["order"], orderNum],
    () => OrdersResourceService.getOrderUsingGet(orderNum!),
    { enabled: !!orderNum }
  );
};
