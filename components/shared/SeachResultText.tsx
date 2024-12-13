import { Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { useMemo } from "react";

const SeachResultText = ({
  text,
  searchValue,
}: {
  text: string;
  searchValue: string;
}) => {
  const searchIndex = useMemo(
    () => text.search(new RegExp(searchValue, "i")),
    [text, searchValue]
  );

  return (
    <>
      {searchIndex === -1 || searchValue.length === 0 ? (
        <Text display="inline">{text}</Text>
      ) : (
        <Box display="inline">
          <Text display="inline">{text.substring(0, searchIndex)}</Text>
          <Text as="u" display="inline">
            {text.substring(searchIndex, searchIndex + searchValue.length)}
          </Text>
          <Text display="inline">
            {text.substring(searchIndex + searchValue.length, text.length)}
          </Text>
        </Box>
      )}
    </>
  );
};

export default SeachResultText;
