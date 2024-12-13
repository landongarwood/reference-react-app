import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Spacer } from "@chakra-ui/react";
import { memo } from "react";
import useMobileNavMenuOpened from "../../hooks/store/useMobileNavMenuOpened";
import RepProfileMobile from "./RepProfileMobile";

const HeaderMobile = memo(() => {
  const [isNavMenuOpened, setIsNavMenuOpened] = useMobileNavMenuOpened();

  return (
    <Box
      boxShadow={{ base: "md", md: "none" }}
      data-testid="page-header-mobile"
      left="0"
      pos="fixed"
      right="0"
      top="0"
      zIndex="top"
    >
      <Flex
        pb={{ base: 5, md: 10 }}
        pt={{ base: 5, md: 6 }}
        px={{ base: 4, md: 8 }}
      >
        <IconButton
          aria-label="Open menu"
          color="black"
          fontSize="3xl"
          icon={<HamburgerIcon />}
          variant="link"
          onClick={() => setIsNavMenuOpened(!isNavMenuOpened)}
        />
        <Spacer />
        <Flex alignItems="center" gap={12}>
          <RepProfileMobile />
        </Flex>
      </Flex>
    </Box>
  );
});

export default HeaderMobile;
