import { useMutation } from "@tanstack/react-query";
import { UserPatchRequestDto, UsersResourceService } from "../../../api";

export const useUpdateUser = (userId: number) => {
  return useMutation((payload: UserPatchRequestDto) =>
    UsersResourceService.patchUsingPatch4(payload, userId)
  );
};
