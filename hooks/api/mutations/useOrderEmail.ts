import { useMutation } from "@tanstack/react-query";
import {
  OrderDetailEmailRequestDto,
  OrdersResourceService,
} from "../../../api";

export const useOrderEmail = () => {
  return useMutation((payload: OrderDetailEmailRequestDto) =>
    OrdersResourceService.sendOrderDetailsEmailUsingPost(payload)
  );
};
