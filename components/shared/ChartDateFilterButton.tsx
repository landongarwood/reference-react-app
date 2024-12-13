import { Button, InputGroup, Text, useDisclosure } from "@chakra-ui/react";
import { usePurchaseAnalysisContext } from "../../contexts/PurchaseAnalysisContext";
import {
  PurchaseAnalysisChartConfigKey,
  PurchaseAnalysisChartOption1,
} from "../../types";
import Popover from "../Popover";
import { CalendarIcon, FilterIcon } from "../icons";
import ChartDateFilterContent from "./ChartDateFilterContent";

const ChartDateFilterButton = ({
  configKey,
  hasAllTime,
}: {
  configKey: PurchaseAnalysisChartConfigKey;
  hasAllTime?: boolean;
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { config } = usePurchaseAnalysisContext();
  const chartConfig = config[configKey] as PurchaseAnalysisChartOption1 | null;

  return (
    <Popover
      closeOnBlur
      closeOnEsc
      bodyElement={
        <ChartDateFilterContent
          configKey={configKey}
          hasAllTime={hasAllTime}
          onClose={onClose}
        />
      }
      bodyProps={{
        p: 1,
      }}
      contentProps={{
        _focusVisible: {
          boxShadow: "0px 8px 16px rgba(224,226,228, 1)",
          outline: "none",
        },
        border: "none",
        boxShadow: "0px 8px 16px rgba(224,226,228, 1)",
        width: "50rem",
      }}
      isOpen={isOpen}
      placement="bottom-start"
      returnFocusOnClose={false}
      triggerElement={
        <InputGroup
          _hover={{
            borderBottomColor: isOpen ? "blue.400" : "transparent",
            borderColor: isOpen ? "blue.400" : "gray.550",
          }}
          borderBottomColor={isOpen ? "blue.400" : "transparent"}
          borderBottomWidth={1}
          borderColor={isOpen ? "blue.400" : "gray.400"}
          borderRadius="sm"
          color={isOpen ? "blue.600" : undefined}
          data-testid="chart-date-filter-btn"
          width="auto"
        >
          <Button
            _active={{
              bg: "gray.50",
            }}
            _hover={{
              bg: "gray.50",
              borderColor: isOpen ? "blue.700" : "gray.550",
            }}
            borderColor={isOpen ? "blue.300" : "gray.200"}
            color={isOpen ? "blue.600" : undefined}
            gap={2}
            h={9}
            px={3}
            onClick={onToggle}
          >
            <Text mr={2}>{chartConfig?.period}</Text>
            <CalendarIcon w="14px" />
            <FilterIcon w="14px" />
          </Button>
        </InputGroup>
      }
      onClose={onClose}
    />
  );
};

export default ChartDateFilterButton;
