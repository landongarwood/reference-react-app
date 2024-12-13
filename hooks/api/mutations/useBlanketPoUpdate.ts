import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BlanketPoPatchRequestDto,
  BlanketPoResourceService,
  BlanketPoResponseDto,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useBlanketPoUpdate = (accountId?: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    BlanketPoResponseDto,
    Error,
    { request: BlanketPoPatchRequestDto; blanketPoId: number }
  >(
    ({ blanketPoId, request }) => {
      return BlanketPoResourceService.updateBlanketPoUsingPatch(
        blanketPoId,
        request
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS["blanket-pos"], accountId]);
      },
    }
  );
};
