import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";
import { memo } from "react";
import SignoutSvg from "../../assets/svgs/signout.svg";
import useMobileProfileMenuOpened from "../../hooks/store/useMobileProfileMenuOpened";
import { getAppLink } from "../../utils/link";

const RepProfileDrawer = memo(() => {
  const [isProfileMenuOpened, setIsProfileMenuOpened] =
    useMobileProfileMenuOpened();

  return (
    <Drawer
      isOpen={isProfileMenuOpened}
      placement="right"
      onClose={() => setIsProfileMenuOpened(false)}
    >
      <DrawerOverlay top={20} />
      <DrawerContent maxWidth="calc(100% - 40px)" top="20!">
        <DrawerHeader
          color="gray.700"
          fontSize="medium"
          fontWeight="normal"
          textAlign="right"
        >
          Rep ID: 800
        </DrawerHeader>
        <DrawerBody p={0}>
          <List>
            <ListItem>
              <Link href={getAppLink("/app/Password/reset")}>
                <Button
                  fontWeight="normal"
                  justifyContent="space-between"
                  variant="ghost"
                  width="full"
                >
                  Change Password
                </Button>
              </Link>
            </ListItem>

            <ListItem>
              <Link href={getAppLink("/app/Auth/logout")}>
                <Button
                  fontWeight="normal"
                  justifyContent="space-between"
                  variant="ghost"
                  width="full"
                >
                  Sign Out <Image src={SignoutSvg} />
                </Button>
              </Link>
            </ListItem>
          </List>
        </DrawerBody>
      </DrawerContent>
      <DrawerCloseButton
        color="white"
        fontSize="md"
        left={1}
        top={20}
        zIndex="overlay"
      />
    </Drawer>
  );
});

export default RepProfileDrawer;
