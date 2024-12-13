import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { kebabCase } from "lodash";

import { memo, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { PatternFormat } from "react-number-format";
import { CHART_DATE_FILTER_OPTIONS } from "../../constants/chart";
import { usePurchaseAnalysisContext } from "../../contexts/PurchaseAnalysisContext";
import {
  PurchaseAnalysisChartConfigKey,
  PurchaseAnalysisChartOption1,
} from "../../types";
import {
  getFormattedDate,
  isValidDateString,
  parseDate,
} from "../../utils/datetime";

const DEFAULT_FILTER_OPTION = CHART_DATE_FILTER_OPTIONS[1]; // 12 months
const CUSTOM_FILTER_OPTION = CHART_DATE_FILTER_OPTIONS.find(
  (option) => option.custom
)!;

const commonInputProps = {
  fontSize: "xs",
  px: 2.5,
};

const formatDate = (date?: Date | null) =>
  date ? format(date, "yyyy-MM-dd") : undefined;
const getDateInputValue = (value?: string) =>
  value ? getFormattedDate(parseDate(value)) : undefined;

const ChartDateFilterContent = ({
  onClose,
  configKey,
  hasAllTime,
}: {
  onClose: () => void;
  configKey: PurchaseAnalysisChartConfigKey;
  hasAllTime?: boolean;
}) => {
  const filterOptions = CHART_DATE_FILTER_OPTIONS.filter(
    (option) => hasAllTime || !option.allTime
  );
  const { config, updateConfig } = usePurchaseAnalysisContext();
  const chartConfig = config[configKey] as PurchaseAnalysisChartOption1 | null;

  useEffect(() => {
    if (!chartConfig) {
      updateConfig(configKey, DEFAULT_FILTER_OPTION);
    }
  }, [chartConfig, configKey, updateConfig]);

  const [selectedOption, setSelectedOption] =
    useState<PurchaseAnalysisChartOption1>(
      chartConfig || DEFAULT_FILTER_OPTION
    );

  const handleStartDateChange = useCallback((value: string | Date | null) => {
    let startDate: Date | undefined | null;
    if (typeof value !== "string") {
      startDate = value ?? undefined;
    } else if (isValidDateString(value, "MM/dd/yyyy")) {
      startDate = parseDate(value, "MM/dd/yyyy");
    }

    setSelectedOption((prev) => ({
      ...prev,
      ...CUSTOM_FILTER_OPTION,
      startDate: formatDate(startDate),
    }));
  }, []);

  const handleEndDateChange = useCallback((value: string | Date | null) => {
    let endDate: Date | undefined | null;
    if (typeof value !== "string") {
      endDate = value ?? undefined;
    } else if (isValidDateString(value, "MM/dd/yyyy")) {
      endDate = parseDate(value, "MM/dd/yyyy");
    }

    setSelectedOption((prev) => ({
      ...prev,
      ...CUSTOM_FILTER_OPTION,
      endDate: formatDate(endDate),
    }));
  }, []);

  const handleSave = useCallback(() => {
    updateConfig(configKey, selectedOption);
    onClose();
  }, [configKey, selectedOption, onClose, updateConfig]);

  return (
    <Box data-testid="chart-date-filter-content" px={4} py={5}>
      <Text fontSize="sm" fontWeight="medium" mb="2.5">
        Filter By:
      </Text>
      <HStack align="start" display="inline-flex" spacing={6} w="full">
        <VStack align="start" spacing={1}>
          {filterOptions.map((option) => (
            <Button
              key={option.period}
              backgroundColor={
                selectedOption.period === option.period
                  ? "gray.150"
                  : "transparent"
              }
              border="none"
              color={
                selectedOption.period === option.period
                  ? "blue.600"
                  : "gray.700"
              }
              colorScheme={
                selectedOption.period === option.period ? undefined : "blue"
              }
              data-testid={`chart-date-filter-option-${kebabCase(
                option.period
              )}`}
              fontSize="sm"
              h={8}
              justifyContent="start"
              textAlign="left"
              variant="ghost"
              w="full"
              onClick={() => setSelectedOption(option)}
            >
              {option.period}
            </Button>
          ))}
        </VStack>
        <Grid
          display="inline-flex"
          gap={6}
          templateColumns="repeat(2, 1fr)"
          w="full"
        >
          <GridItem w="full">
            <Text fontSize="sm" fontWeight="medium" lineHeight={1} mb={3}>
              From
            </Text>
            <HStack spacing={3}>
              <PatternFormat
                {...commonInputProps}
                customInput={Input}
                data-testid="chart-date-filter-from-date-input"
                format="##/##/####"
                mask="_"
                maxW="24"
                placeholder="mm/dd/yyyy"
                value={getDateInputValue(selectedOption.startDate)}
                onValueChange={({ formattedValue }) =>
                  handleStartDateChange(formattedValue)
                }
              />
            </HStack>

            <Box mt={5}>
              <DatePicker
                fixedHeight
                inline
                data-testid="chart-date-filter-from-date-picker"
                dateFormat="MM/dd/yyyy"
                selected={parseDate(selectedOption.startDate)}
                onChange={(value) => handleStartDateChange(value)}
              />
            </Box>
          </GridItem>
          <GridItem w="full">
            <Text fontSize="sm" fontWeight="medium" lineHeight={1} mb={3}>
              To
            </Text>
            <HStack>
              <PatternFormat
                {...commonInputProps}
                customInput={Input}
                data-testid="chart-date-filter-to-date-input"
                format="##/##/####"
                mask="_"
                maxW="24"
                placeholder="mm/dd/yyyy"
                value={getDateInputValue(selectedOption.endDate)}
                onValueChange={({ formattedValue }) =>
                  handleEndDateChange(formattedValue)
                }
              />
            </HStack>

            <Box mt={5}>
              <DatePicker
                fixedHeight
                inline
                data-testid="chart-date-filter-to-date-picker"
                dateFormat="MM/dd/yyyy"
                selected={parseDate(selectedOption.endDate)}
                onChange={(value) => handleEndDateChange(value)}
              />
            </Box>
          </GridItem>
        </Grid>
      </HStack>
      <HStack mt={4} px={2}>
        <Spacer />
        <Button
          colorScheme="blue"
          data-testid="chart-date-filter-save-btn"
          fontSize="sm"
          h={9}
          onClick={handleSave}
        >
          Apply
        </Button>
      </HStack>
    </Box>
  );
};

export default memo(ChartDateFilterContent) as typeof ChartDateFilterContent;
