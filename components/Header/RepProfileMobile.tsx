import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button, Flex, Image } from "@chakra-ui/react";
import { memo } from "react";
import UserSvg from "../../assets/svgs/user.svg";
import useMobileProfileMenuOpened from "../../hooks/store/useMobileProfileMenuOpened";

const RepProfileMobile = memo(() => {
  const [isProfileMenuOpened, setIsProfileMenuOpened] =
    useMobileProfileMenuOpened();
  return (
    <Button
      variant="unstyled"
      onClick={() => setIsProfileMenuOpened(!isProfileMenuOpened)}
    >
      <Flex alignItems="center" as="span" gap={1}>
        <Image src={UserSvg} />
        {isProfileMenuOpened ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Flex>
    </Button>
  );
});

export default RepProfileMobile;
