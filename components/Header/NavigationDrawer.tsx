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
  Text,
} from "@chakra-ui/react";
import { memo, MouseEvent, useCallback, useMemo, useState } from "react";
import ArrowLeftSvg from "../../assets/svgs/arrow-left.svg";
import ArrowRightSvg from "../../assets/svgs/arrow-right.svg";
import LogoSvg from "../../assets/svgs/logo.svg";
import { MenuItem } from "../../constants/header";
import useMenus from "../../hooks/store/useMenus";
import useMobileNavMenuOpened from "../../hooks/store/useMobileNavMenuOpened";
import { getAppLink } from "../../utils/link";

const NavigationDrawer = memo(() => {
  const [isNavMenuOpened, setIsNavMenuOpened] = useMobileNavMenuOpened();
  const [selectedMenuItem, setSelectedMenuItem] = useState<{
    parent?: MenuItem;
    current?: MenuItem;
  }>({});

  const onClose = useCallback(() => {
    setIsNavMenuOpened(false);
    setSelectedMenuItem({});
  }, [setIsNavMenuOpened]);

  const allMenus = useMenus();

  const menus = useMemo(
    () =>
      selectedMenuItem.current
        ? selectedMenuItem.current.children ?? []
        : allMenus,
    [allMenus, selectedMenuItem]
  );

  const onLinkClick = useCallback(
    (e: MouseEvent, item: MenuItem) => {
      if (item.children) {
        e.preventDefault();
        setSelectedMenuItem({
          current: item,
          parent: selectedMenuItem.current,
        });
      }
    },
    [selectedMenuItem]
  );

  return (
    <Drawer isOpen={isNavMenuOpened} placement="left" onClose={onClose}>
      <DrawerOverlay top={20} />
      <DrawerContent maxWidth="calc(100% - 40px)" top="20!">
        <DrawerHeader color="gray.700" fontSize="medium" fontWeight="normal">
          {selectedMenuItem.current ? (
            <Button
              fontWeight="normal"
              gap={2}
              h={8}
              p={0}
              variant="ghost"
              onClick={() =>
                setSelectedMenuItem({
                  current: selectedMenuItem.parent,
                  parent: undefined,
                })
              }
            >
              <Image src={ArrowLeftSvg} />
              {selectedMenuItem.parent
                ? selectedMenuItem.parent.name
                : "Main Menu"}
            </Button>
          ) : (
            <Image h={8} src={LogoSvg} />
          )}
        </DrawerHeader>
        <DrawerBody p={0}>
          {selectedMenuItem.current && (
            <Text fontSize="xl" pb={6} pt={2} px={4}>
              {selectedMenuItem.current.name}
            </Text>
          )}
          <List>
            {menus.map((item) => (
              <ListItem key={item.key ?? item.name}>
                <Link
                  href={getAppLink(item.path ?? "/")}
                  onClick={(e) => onLinkClick(e, item)}
                >
                  <Button
                    fontWeight="normal"
                    justifyContent="space-between"
                    variant="ghost"
                    width="full"
                  >
                    {item.name} {item.children && <Image src={ArrowRightSvg} />}
                  </Button>
                </Link>
              </ListItem>
            ))}
          </List>
        </DrawerBody>
      </DrawerContent>
      <DrawerCloseButton
        color="white"
        fontSize="md"
        right={1}
        top={20}
        zIndex="overlay"
      />
    </Drawer>
  );
});

export default NavigationDrawer;
