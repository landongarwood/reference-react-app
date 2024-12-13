import { QueryClient, useMutation } from "@tanstack/react-query";
import { UserPermissionsPatchDto, UsersResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useUserRightsUpdate = (userId: number) => {
  const queryClient = new QueryClient();
  return useMutation(
    (permissions: UserPermissionsPatchDto[]) =>
      UsersResourceService.updatePermissionsUsingPatch(userId, permissions),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS["user-rights"], userId]);
      },
    }
  );
};
