import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  QuoteLinePatchRequestDto,
  QuoteLinePatchResponseDto,
  QuoteLineResourceService,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useQuoteLineUpdate = (quoteNumber: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    QuoteLinePatchResponseDto,
    Error,
    { quoteLineId: number; request: Partial<QuoteLinePatchRequestDto> }
  >(
    ({ quoteLineId, request }) => {
      return QuoteLineResourceService.updateQuoteLineUsingPatch(
        quoteLineId,
        request as QuoteLinePatchRequestDto
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS["quote"], quoteNumber]);
      },
    }
  );
};
