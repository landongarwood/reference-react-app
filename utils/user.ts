import { UserRightsDto } from "../api";
import { UserPermission } from "../types";

export const hasPermission = (
  userRights: UserRightsDto[] | undefined,
  permission: UserPermission
) => (userRights || []).some((userRight) => userRight.rightCode === permission);
