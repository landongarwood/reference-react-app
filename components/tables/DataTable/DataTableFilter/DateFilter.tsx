import {
  Box,
  Button,
  ButtonProps,
  Grid,
  GridItem,
  HStack,
  Input,
  Select,
  SelectProps,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Header } from "@tanstack/react-table";
import { endOfToday, startOfToday } from "date-fns";
import { kebabCase } from "lodash";

import { memo, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm, UseFormSetValue } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { FILTER_BLANK_OPTIONS } from "../../../../constants/dataTable";
import {
  DATE_FILTER_FROM_OPTIONS,
  DATE_FILTER_OPTIONS,
  DATE_FILTER_PERIOD_DIRECTIONS,
  DATE_FILTER_PERIOD_OPTIONS,
  DATE_FILTER_START_END_OF_PERIODS,
  DATE_FILTER_START_END_OPTIONS,
  DATE_FILTER_START_END_PERIOD_POINTERS,
  DATE_FILTER_TO_OPTIONS,
} from "../../../../constants/datefilter";
import { DateFilterFormValues } from "../../../../types";
import {
  convertDateOptionsIntoTextualRepresentation,
  convertTextualRepresentationIntoDateOptions,
  getFormattedDate,
  isValidDateString,
  parseDate,
} from "../../../../utils/datetime";
import { useDataTableContext } from "../DataTableContext";

const commonSelectProps: SelectProps = {
  fontSize: "xs",
  sx: { pl: 2.5 },
};
const commonInputProps = {
  fontSize: "xs",
  px: 2.5,
};

const filterButtonProps = (isActive: boolean): ButtonProps => ({
  _hover: {
    bgColor: isActive ? "transparent" : "gray.175",
  },
  bgColor: isActive ? "transparent" : "gray.150",
  borderColor: isActive ? "blue.700" : "gray.500",
  color: isActive ? "blue.700" : "gray.700",
  colorScheme: isActive ? "blue" : undefined,
  fontSize: "sm",
  h: 8,
  justifyContent: "start",
  textAlign: "left",
  variant: isActive ? "ghost" : "solid",
  w: "full",
});

const defaultValues: DateFilterFormValues = {
  dates: [
    {
      date: startOfToday(),
      duration: "7",
      durationPointer: "before",
      durationUnit: "days",
      option: "",
      startOrEnd: "start",
      startOrEndPointer: "this",
      startOrEndUnit: "month",
    },
    {
      date: endOfToday(),
      duration: "1",
      durationPointer: "after",
      durationUnit: "days",
      option: "",
      startOrEnd: "end",
      startOrEndPointer: "this",
      startOrEndUnit: "month",
    },
  ],
};

const DateFilter = <TData, TValue>({
  header,
  onClose,
}: {
  header: Header<TData, TValue>;
  onClose: () => void;
}) => {
  const { criteria, updateFilter } = useDataTableContext();
  const { id: element } = header.column.columnDef;
  const defaultStartDate = element
    ? (criteria.gt?.[0]?.[element]?.[0] as string)
    : undefined;
  const defaultEndDate = element
    ? (criteria.lt?.[0]?.[element]?.[0] as string)
    : undefined;

  const { control, register, handleSubmit, watch, setValue } =
    useForm<DateFilterFormValues>({
      defaultValues: {
        dates: [
          defaultStartDate
            ? convertTextualRepresentationIntoDateOptions(defaultStartDate)
            : defaultValues.dates[0],
          defaultEndDate
            ? convertTextualRepresentationIntoDateOptions(defaultEndDate)
            : defaultValues.dates[1],
        ],
      },
    });

  const allFields = watch();

  const [selectedOption, setSelectedOption] = useState(
    DATE_FILTER_OPTIONS[0].label
  );
  const [blankOrNonBlank, setBlankOrNonBlank] = useState<string | undefined>(); // true: blank, false: non-blank, undefined: other

  const isBlankOrNonBlank = !!blankOrNonBlank;

  const handleFilterOptionClick = useCallback(
    (option: {
      label: string;
      onClick?: (setValue: UseFormSetValue<DateFilterFormValues>) => () => void;
    }) => {
      if (option.onClick) {
        option.onClick(setValue)();
      }

      setBlankOrNonBlank(undefined);
      setTimeout(() => setSelectedOption(option.label), 10);
    },
    [setValue]
  );

  const handleBlankOptions = useCallback(
    (blankOrNonBlank: string) => {
      setSelectedOption(DATE_FILTER_OPTIONS[0].label);
      setValue("dates.0.option", "");
      setValue("dates.1.option", "");
      setBlankOrNonBlank(blankOrNonBlank);
      if (element) {
        updateFilter([
          {
            field: element,
            key: "eq",
            values: [blankOrNonBlank],
          },
          {
            field: element,
            key: "gt",
            values: [],
          },
          {
            field: element,
            key: "lt",
            values: [],
          },
        ]);
      }
      onClose();
    },
    [element, onClose, setValue, updateFilter]
  );

  const handleSave = useCallback(
    (values: DateFilterFormValues) => {
      if (element) {
        if (blankOrNonBlank) {
          updateFilter([
            {
              field: element,
              key: "eq",
              values: [blankOrNonBlank],
            },
            {
              field: element,
              key: "gt",
              values: [],
            },
            {
              field: element,
              key: "lt",
              values: [],
            },
          ]);
        } else {
          const startDateValue = convertDateOptionsIntoTextualRepresentation(
            values.dates[0]
          );
          const endDateValue = convertDateOptionsIntoTextualRepresentation(
            values.dates[1]
          );
          updateFilter([
            {
              field: element,
              key: "eq",
              values: [],
            },
            {
              field: element,
              key: "gt",
              values: startDateValue ? [startDateValue] : [],
            },
            {
              field: element,
              key: "lt",
              values: endDateValue ? [endDateValue] : [],
            },
          ]);
        }
      }

      onClose();
    },
    [blankOrNonBlank, element, onClose, updateFilter]
  );

  const handleClear = useCallback(() => {
    if (element) {
      updateFilter([
        {
          field: element,
          key: "eq",
          values: [],
        },
        {
          field: element,
          key: "gt",
          values: [],
        },
        {
          field: element,
          key: "lt",
          values: [],
        },
      ]);
    }
    setValue("dates", defaultValues.dates);
    onClose();
  }, [element, onClose, updateFilter, setValue]);

  useEffect(() => {
    setSelectedOption(DATE_FILTER_OPTIONS[0].label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allFields)]);

  return (
    <Box px={4} py={5}>
      <form onSubmit={handleSubmit(handleSave)}>
        <Text fontSize="sm" fontWeight="medium" mb="2.5">
          Filter By:
        </Text>
        <HStack align="start" display="inline-flex" spacing={6} w="full">
          <VStack align="start" spacing={1}>
            <Button
              {...filterButtonProps(!isBlankOrNonBlank)}
              data-testid={`dt-date-filter-option-${kebabCase(
                DATE_FILTER_OPTIONS[0].label
              )}`}
              onClick={() => handleFilterOptionClick(DATE_FILTER_OPTIONS[0])}
            >
              {DATE_FILTER_OPTIONS[0].label}
            </Button>
            {DATE_FILTER_OPTIONS.slice(1).map((option) => (
              <Button
                key={option.label}
                backgroundColor={
                  selectedOption === option.label ? "gray.150" : "transparent"
                }
                border="none"
                color={
                  selectedOption === option.label ? "blue.600" : "gray.700"
                }
                colorScheme={
                  selectedOption === option.label ? undefined : "blue"
                }
                data-testid={`dt-date-filter-option-${kebabCase(option.label)}`}
                fontSize="sm"
                h={8}
                justifyContent="start"
                textAlign="left"
                variant="ghost"
                w="full"
                onClick={() => handleFilterOptionClick(option)}
              >
                {option.label}
              </Button>
            ))}
            <Button
              {...filterButtonProps(
                blankOrNonBlank === FILTER_BLANK_OPTIONS[0]
              )}
              data-testid={`dt-date-filter-option-${FILTER_BLANK_OPTIONS[0]}`}
              onClick={() => handleBlankOptions(FILTER_BLANK_OPTIONS[0])}
            >
              All Blank Dates
            </Button>
            <Button
              {...filterButtonProps(
                blankOrNonBlank === FILTER_BLANK_OPTIONS[1]
              )}
              data-testid={`dt-date-filter-option-${FILTER_BLANK_OPTIONS[1]}`}
              onClick={() => handleBlankOptions(FILTER_BLANK_OPTIONS[1])}
            >
              All Non-Blank Dates
            </Button>
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
                <Select
                  {...commonSelectProps}
                  {...register("dates.0.option")}
                  data-testid="dt-date-filter-from-date-options"
                  isDisabled={isBlankOrNonBlank}
                >
                  {DATE_FILTER_FROM_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>

                {allFields.dates[0].option === "specific-date" && (
                  <Controller
                    control={control}
                    name="dates.0.date"
                    render={({ field: { value, onChange } }) => (
                      <PatternFormat
                        {...commonInputProps}
                        customInput={Input}
                        data-testid="dt-date-filter-from-specific-date"
                        format="##/##/####"
                        mask="_"
                        maxW="24"
                        placeholder="mm/dd/yyyy"
                        value={getFormattedDate(value)}
                        onValueChange={({ formattedValue }) =>
                          isValidDateString(formattedValue, "MM/dd/yyyy") &&
                          onChange(parseDate(formattedValue, "MM/dd/yyyy"))
                        }
                      />
                    )}
                  />
                )}
              </HStack>

              {allFields.dates[0].option === "periods-before-after" && (
                <HStack mt={5}>
                  <Input
                    {...commonInputProps}
                    type="number"
                    {...register("dates.0.duration")}
                    data-testid="dt-date-filter-from-periods-duration"
                    minW="auto"
                    w="12"
                  />
                  <Select
                    {...commonSelectProps}
                    {...register("dates.0.durationUnit")}
                    data-testid="dt-date-filter-from-periods-unit"
                  >
                    {DATE_FILTER_PERIOD_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <Select
                    {...commonSelectProps}
                    {...register("dates.0.durationPointer")}
                    data-testid="dt-date-filter-from-periods-pointer"
                  >
                    {DATE_FILTER_PERIOD_DIRECTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </HStack>
              )}

              {allFields.dates[0].option === "start-end-of-periods" && (
                <HStack mt={5}>
                  <Select
                    {...commonSelectProps}
                    {...register("dates.0.startOrEnd")}
                    data-testid="dt-date-filter-from-periods-option"
                  >
                    {DATE_FILTER_START_END_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <Select
                    {...commonSelectProps}
                    {...register("dates.0.startOrEndPointer")}
                    data-testid="dt-date-filter-from-periods-pointer"
                    sx={{
                      ...commonSelectProps.sx,
                      pr: 4,
                      w: 16,
                    }}
                    w="16"
                  >
                    {DATE_FILTER_START_END_PERIOD_POINTERS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <Select
                    {...commonSelectProps}
                    {...register("dates.0.startOrEndUnit")}
                    data-testid="dt-date-filter-from-periods-unit"
                  >
                    {DATE_FILTER_START_END_OF_PERIODS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </HStack>
              )}

              {allFields.dates[0].option === "specific-date" && (
                <Box mt={5}>
                  <Controller
                    control={control}
                    name="dates.0.date"
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        fixedHeight
                        inline
                        data-testid="dt-date-filter-from-date-picker"
                        dateFormat="MM/dd/yyyy"
                        selected={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Box>
              )}
            </GridItem>
            <GridItem w="full">
              <Text fontSize="sm" fontWeight="medium" lineHeight={1} mb={3}>
                To
              </Text>
              <HStack>
                <Select
                  {...commonSelectProps}
                  {...register("dates.1.option")}
                  data-testid="dt-date-filter-to-date-options"
                  isDisabled={isBlankOrNonBlank}
                  sx={{ pl: 2.5 }}
                >
                  {DATE_FILTER_TO_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>

                {allFields.dates[1].option === "specific-date" && (
                  <Controller
                    control={control}
                    name="dates.1.date"
                    render={({ field: { value, onChange } }) => (
                      <PatternFormat
                        {...commonInputProps}
                        customInput={Input}
                        data-testid="dt-date-filter-to-specific-date"
                        format="##/##/####"
                        mask="_"
                        maxW="24"
                        placeholder="mm/dd/yyyy"
                        value={getFormattedDate(value)}
                        onValueChange={({ formattedValue }) =>
                          isValidDateString(formattedValue, "MM/dd/yyyy") &&
                          onChange(parseDate(formattedValue, "MM/dd/yyyy"))
                        }
                      />
                    )}
                  />
                )}
              </HStack>

              {allFields.dates[1].option === "periods-before-after" && (
                <HStack mt={5}>
                  <Input
                    {...commonInputProps}
                    type="number"
                    {...register("dates.1.duration")}
                    data-testid="dt-date-filter-to-periods-duration"
                    w="12"
                  />
                  <Select
                    {...commonSelectProps}
                    {...register("dates.1.durationUnit")}
                    data-testid="dt-date-filter-to-periods-unit"
                  >
                    {DATE_FILTER_PERIOD_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <Select
                    {...commonSelectProps}
                    {...register("dates.1.durationPointer")}
                    data-testid="dt-date-filter-to-periods-pointer"
                  >
                    {DATE_FILTER_PERIOD_DIRECTIONS.reverse().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </HStack>
              )}

              {allFields.dates[1].option === "start-end-of-periods" && (
                <HStack mt={5}>
                  <Select
                    {...commonSelectProps}
                    {...register("dates.1.startOrEnd")}
                    data-testid="dt-date-filter-to-periods-option"
                  >
                    {DATE_FILTER_START_END_OPTIONS.reverse().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <Select
                    {...commonSelectProps}
                    {...register("dates.1.startOrEndPointer")}
                    data-testid="dt-date-filter-to-periods-pointer"
                  >
                    {DATE_FILTER_START_END_PERIOD_POINTERS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <Select
                    {...commonSelectProps}
                    {...register("dates.1.startOrEndUnit")}
                    data-testid="dt-date-filter-to-periods-unit"
                  >
                    {DATE_FILTER_START_END_OF_PERIODS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </HStack>
              )}

              {allFields.dates[1].option === "specific-date" && (
                <Box mt={5}>
                  <Controller
                    control={control}
                    name="dates.1.date"
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        fixedHeight
                        inline
                        data-testid="dt-date-filter-to-date-picker"
                        dateFormat="MM/dd/yyyy"
                        selected={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Box>
              )}
            </GridItem>
          </Grid>
        </HStack>
        <HStack mt={4} px={2}>
          <Button
            data-testid="dt-column-filter-facet-clear-btn"
            h={9}
            onClick={handleClear}
          >
            Clear
          </Button>
          <Spacer />
          <Button
            colorScheme="blue"
            data-testid="dt-column-filter-facet-apply-btn"
            fontSize="sm"
            h={9}
            type="submit"
          >
            Apply
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default memo(DateFilter) as typeof DateFilter;
