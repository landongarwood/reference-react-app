import { useMutation } from "@tanstack/react-query";
import { UserPatchRequestDto, UsersResourceService } from "../../../api";

export const useUserUpdate = () => {
  return useMutation(
    ({ userId, userData }: { userId: number; userData: UserPatchRequestDto }) =>
      UsersResourceService.patchUsingPatch4(userData, userId)
  );
};
