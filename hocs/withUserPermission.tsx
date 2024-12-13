import { ComponentType, memo } from "react";
import { useUserRights } from "../hooks/api/queries";
import Forbidden from "../pages/Forbidden";
import { UserPermission } from "../types";

export const withUserPermission = <Props extends {}>(
  PageComponent: ComponentType<Props>,
  userRight: UserPermission
) =>
  memo((props: Props) => {
    const { data: userRights, isFetching } = useUserRights();

    const hasAccess = (userRights ?? []).some(
      (right) => right.rightCode === userRight
    );

    if (isFetching) {
      return null;
    }

    if (!hasAccess) {
      return <Forbidden />;
    }

    return <PageComponent {...props} />;
  });
