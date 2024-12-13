import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Image } from "@chakra-ui/image";
import { Box, Link, Spacer, Text } from "@chakra-ui/layout";
import { ManufacturerPartSearchResultDto } from "../../api";
import { BookmarkHeartIcon } from "../icons";
import { SearchResultEntityInStockStatus, SearchResultEntityPrice } from ".";

export const SearchResultEntity = ({
  entity,
}: {
  entity: ManufacturerPartSearchResultDto;
}) => {
  return (
    <Box data-testid="sr-result-entity" h="100%" p={4} w="100%">
      <Box display="flex" gap={5} w="100%">
        <Box alignItems="center" display="flex" gap={6} w={170}>
          <Checkbox data-testid="sr-result-entity-compare-checkbox">
            <Text fontSize="sm">Compare</Text>
          </Checkbox>
          <Box
            alignItems="center"
            cursor="pointer"
            data-testid="sr-result-entity-save-button"
            display="flex"
            gap={1}
          >
            <BookmarkHeartIcon />
            <Text fontSize="sm">Save</Text>
          </Box>
        </Box>
        <Spacer />
        <SearchResultEntityInStockStatus
          manufacturerProductId={entity.manufacturerProductId}
        />
      </Box>
      <Box display="flex" gap={5} mt={4} w="100%">
        <Box w={170}>
          <Image
            alt={entity.name}
            data-testid="sr-result-entity-image"
            h="auto"
            maxHeight="100%"
            maxWidth="100%"
            src={entity.primaryImage}
            w="auto"
          />
        </Box>
        <Box flex={1}>
          <Link href="#">
            <Text
              color="blue.600"
              data-testid="sr-result-entity-name"
              fontSize="lg"
              fontWeight={500}
            >
              {entity.name}
            </Text>
          </Link>
          <Text
            color="gray.700"
            data-testid="sr-result-entity-description"
            fontSize="sm"
            fontWeight={500}
            mt={2}
          >
            Mfg. Part #: {entity.manufacturerPart}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          ml={5}
          w={150}
        >
          <SearchResultEntityPrice
            manufacturerProductId={entity.manufacturerProductId}
          />
          <Box
            alignItems="start"
            color="gray.700"
            data-testid="sr-result-entity-shipt-status"
            display="flex"
          >
            {/* <TruckIcon h="12px" mr={2} mt={1} w="16px" /> */}
            <Text fontSize="xs"></Text>
          </Box>
          <Button
            colorScheme="blue"
            data-testid="sr-result-entity-add-to-cart-button"
            h="35px"
            variant="solid"
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
