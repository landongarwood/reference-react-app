import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";
import { kebabCase } from "lodash";
import { memo } from "react";
import LogoSvg from "../../assets/svgs/logo.svg";
import useMenus from "../../hooks/store/useMenus";
import useQuickLinks from "../../hooks/store/useQuickLinks";
import { getAppLink } from "../../utils/link";
import AccountSelector from "./AccountSelector";
import NavigationMenu from "./NavigationMenu";
import RepProfile from "./RepProfile";
import SalesSummary from "./SalesSummary";
import SearchInput from "./SearchInput";

const Header = memo(() => {
  const menus = useMenus();
  const quickLinks = useQuickLinks();

  return (
    <Box
      boxShadow={{ base: "md", md: "none" }}
      data-testid="page-header-desktop"
    >
      <Flex alignItems="center" h="118px" px={{ base: 4, md: 8 }}>
        <AccountSelector />
        <SearchInput />
        <Spacer />
        <Flex alignItems="center" gap={12}>
          <RepProfile />
        </Flex>
      </Flex>

      <Flex px={14} py="6px">
        <Spacer />
        <Flex gap="30px">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              _hover={{ color: "blue.600" }}
              data-testid={`quick-link-${kebabCase(link.name)}`}
              href={link.internal ? link.path : getAppLink(link.path ?? "/")}
            >
              {link.name}
            </Link>
          ))}
        </Flex>
      </Flex>

      <Flex
        alignItems="center"
        bg="gray.100"
        borderColor="gray.150"
        borderWidth={1}
        gap={16}
        justifyContent="space-between"
        px="30px"
      >
        <Flex alignItems="center" gap={16}>
          <Image data-testid="app-logo" h="24px" src={LogoSvg} />

          <Flex data-testid="navigation-menu-list" gap={10}>
            {menus.map((item) =>
              item.children ? (
                <NavigationMenu
                  key={item.name}
                  buttonText={item.name}
                  items={item.children}
                />
              ) : (
                <Link
                  key={item.name}
                  data-testid="navigation-link-help"
                  href={item.path}
                  target="_blank"
                >
                  <Button variant="navigation-menu">Help</Button>
                </Link>
              )
            )}
          </Flex>
        </Flex>

        <SalesSummary />
      </Flex>
    </Box>
  );
});

export default Header;
