import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BlanketPoRequestDto,
  BlanketPoResourceService,
  BlanketPoResponseDto,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useBlanketPoCreate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    BlanketPoResponseDto,
    Error,
    { request: BlanketPoRequestDto; accountId?: number }
  >(
    ({ accountId, request }) => {
      return BlanketPoResourceService.createBlanketPoUsingPost(
        request,
        accountId
      );
    },
    {
      onSuccess: (response, { accountId }) => {
        queryClient.invalidateQueries([QUERY_KEYS["blanket-pos"], accountId]);
      },
    }
  );
};
