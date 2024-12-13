import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { memo } from "react";
import { useUserData } from "../../hooks/api/queries";
import { getAppLink } from "../../utils/link";

const RepProfile = memo(() => {
  const { data, isLoading } = useUserData();

  return isLoading ? (
    <Spinner size="sm" />
  ) : (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton data-testid="profile-btn">
            <Flex alignItems="center" as="span" gap={1}>
              {`${data?.firstName} ${data?.lastName}`}
              {isOpen ? (
                <TriangleUpIcon color="cyan.400" h={2} />
              ) : (
                <TriangleDownIcon color="cyan.400" h={2} />
              )}
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem data-testid="profile-change-password">
              <Link href={getAppLink("/app/Password/reset")} width="full">
                Change Password
              </Link>
            </MenuItem>
            <MenuItem data-testid="profile-sign-out">
              <Link href={getAppLink("/app/Auth/logout")} width="full">
                Sign Out
              </Link>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
});

export default RepProfile;
