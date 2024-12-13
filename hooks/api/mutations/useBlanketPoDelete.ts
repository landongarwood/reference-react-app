import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlanketPoResourceService, BlanketPoResponseDto } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useBlanketPoDelete = (accountId?: number) => {
  const queryClient = useQueryClient();

  return useMutation<BlanketPoResponseDto, Error, number>(
    (blanketPoId) => {
      return BlanketPoResourceService.deleteBlanketPoUsingDelete(blanketPoId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS["blanket-pos"], accountId]);
      },
    }
  );
};
