import { Box, ChakraProvider, Flex, Heading, Show } from "@chakra-ui/react";
import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import useResizeObserver from "use-resize-observer";
import { useGlobalState } from "../hooks/store/base";
import usePageTitle from "../hooks/store/usePageTitle";
import chakraTheme from "../theme";
import Header from "./Header/Header";
import HeaderMobile from "./Header/HeaderMobile";
import NavigationDrawer from "./Header/NavigationDrawer";
import RepProfileDrawer from "./Header/RepProfileDrawer";

const Layout = () => {
  const [title] = usePageTitle();
  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>();
  const [, setContentWidth] = useGlobalState("contentWidth");

  useLayoutEffect(() => {
    setContentWidth(width);
  }, [setContentWidth, width]);

  return (
    <ChakraProvider
      theme={chakraTheme}
      toastOptions={{
        defaultOptions: {
          containerStyle: {},
        },
      }}
    >
      <Flex data-testid="page-root" flexDir="column" minHeight="100vh">
        <Show below="md">
          <HeaderMobile />
        </Show>
        <Show above="md">
          <Header />
        </Show>

        <Box mt={{ base: 28, md: 8 }} />
        {title && (
          <Heading
            as="h1"
            data-testid="page-title"
            fontWeight="normal"
            px={10}
            size="md"
          >
            {title}
          </Heading>
        )}
        <Box mt={4} />
        <Box
          ref={ref}
          data-testid="page-content"
          flex="1 1 0"
          mx={{ md: 8 }}
          pos="relative"
        >
          <Outlet />
          <Show below="md">
            <NavigationDrawer />
            <RepProfileDrawer />
          </Show>
        </Box>

        <Box mt={8} />
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;
