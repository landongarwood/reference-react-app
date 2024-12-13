import {
  Box,
  Button,
  ChakraProvider,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import CloudMaskSvg from "../../assets/svgs/cloud-mask.svg";
import LaptopNotFoundSvg from "../../assets/svgs/laptop-not-found.svg";
import { withPageTitle } from "../../hocs";
import chakraTheme from "../../theme";

const NotFound = () => {
  const handleClickBack = () => {
    window.location.href = "/";
  };

  return (
    <ChakraProvider theme={chakraTheme}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          position: "relative",
          width: "100wh",
        }}
      >
        <Image
          src={CloudMaskSvg}
          sx={{ position: "absolute", right: 0, top: 0 }}
        />
        <VStack>
          <Image src={LaptopNotFoundSvg} />
          <Text
            color="#2FA3DE"
            fontSize={150}
            fontWeight={600}
            sx={{ lineHeight: "150px" }}
          >
            404
          </Text>
          <Text color="#231F20" fontSize={48}>
            Page not found
          </Text>
          <Text color="#231F20" fontSize={24} sx={{ py: 5 }}>
            We can't find what you're looking for.
          </Text>
          <Button
            colorScheme="blue"
            size="lg"
            sx={{
              border: "solid 1px #0D99D7",
              borderRadius: 2,
              fontSize: 16,
              px: 12,
            }}
            variant="solid"
            onClick={handleClickBack}
          >
            Back to Home
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default withPageTitle("Page Not Found", NotFound);
