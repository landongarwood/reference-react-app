import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Header } from "@tanstack/react-table";
import { isNil, isUndefined } from "lodash";
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useListingFacets } from "../../../../hooks/api/queries";
import { ColumnType } from "../../../../types";
import { useDataTableContext } from "../DataTableContext";

const NumberFilter = <TData, TValue>({
  header,
  onClose,
}: {
  header: Header<TData, TValue>;
  onClose: () => void;
}) => {
  const [fromValue, setFromValue] = useState<number>();
  const [toValue, setToValue] = useState<number>();
  const { criteria, updateFilter, listingName } = useDataTableContext();
  const { header: label, id: element, meta } = header.column.columnDef;
  const type = meta as ColumnType;

  const initialFromValue = criteria.ge?.[0]?.[element ?? ""]?.[0];
  const initialToValue = criteria.le?.[0]?.[element ?? ""]?.[0];

  useEffect(() => {
    if (!isUndefined(initialFromValue)) {
      setFromValue(+initialFromValue);
    }
  }, [initialFromValue]);

  useEffect(() => {
    if (!isUndefined(initialToValue)) {
      setToValue(+initialToValue);
    }
  }, [initialFromValue, initialToValue]);

  const { data } = useListingFacets({
    column: element ?? "",
    enabled: !!listingName,
    listingName: listingName!,
  });

  const onApply = useCallback(() => {
    if (element) {
      updateFilter([
        {
          field: element,
          key: "ge",
          values: isUndefined(fromValue) ? [] : [fromValue.toString()],
        },
        {
          field: element,
          key: "le",
          values: isUndefined(toValue) ? [] : [toValue.toString()],
        },
      ]);
    }
    onClose();
  }, [element, fromValue, onClose, toValue, updateFilter]);

  const onClear = useCallback(() => {
    if (element) {
      updateFilter([
        {
          field: element,
          key: "ge",
          values: [],
        },
        {
          field: element,
          key: "le",
          values: [],
        },
      ]);
    }

    onClose();
    setFromValue(undefined);
    setToValue(undefined);
  }, [element, onClose, updateFilter]);

  const isValueInRange = useCallback(
    (value: number) => {
      return Boolean(
        (isNil(data?.minimum) || parseInt(data?.minimum ?? "0") <= value) &&
          (isNil(data?.maximum) || parseInt(data?.maximum ?? "0") >= value)
      );
    },
    [data?.maximum, data?.minimum]
  );

  return (
    <Fragment>
      <Box p={4}>
        <Box py={2}>
          <Text fontSize="sm" fontWeight="medium">
            {`Filter by ${label}:`}
          </Text>
        </Box>
        <Flex gap={3} mt={6}>
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="medium">
              From:
            </FormLabel>
            <NumericFormat
              customInput={Input}
              data-testid="dt-number-filter-min-input"
              decimalScale={type === "integer" ? 0 : 2}
              fixedDecimalScale={type !== "integer"}
              isAllowed={({ floatValue }) =>
                isUndefined(floatValue) || isValueInRange(floatValue)
              }
              prefix={type === "currency" ? "$" : undefined}
              suffix={type === "percentage" ? "%" : undefined}
              thousandSeparator=","
              value={isUndefined(fromValue) ? "" : fromValue}
              onValueChange={(values) => setFromValue(values.floatValue)}
            />
            <FormHelperText
              color="gray.475"
              data-testid="dt-number-filter-min-limit"
              fontSize="xs"
              fontWeight="normal"
            >
              Min: {data?.minimum ?? "-"}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm" fontWeight="medium">
              To:
            </FormLabel>
            <NumericFormat
              customInput={Input}
              data-testid="dt-number-filter-max-input"
              decimalScale={type === "integer" ? 0 : 2}
              fixedDecimalScale={type !== "integer"}
              isAllowed={({ floatValue }) =>
                isUndefined(floatValue) || isValueInRange(floatValue)
              }
              prefix={type === "currency" ? "$" : undefined}
              suffix={type === "percentage" ? "%" : undefined}
              thousandSeparator=","
              value={isUndefined(toValue) ? "" : toValue}
              onValueChange={({ floatValue }) => setToValue(floatValue)}
            />
            <FormHelperText
              color="gray.475"
              data-testid="dt-number-filter-max-limit"
              fontSize="xs"
              fontWeight="normal"
            >
              Max: {data?.maximum ?? "-"}
            </FormHelperText>
          </FormControl>
        </Flex>
        <Box mt={5}>
          <HStack>
            <Button h={9} onClick={onClear}>
              Clear
            </Button>
            <Spacer />
            <Button
              colorScheme="blue"
              fontSize="sm"
              h={9}
              isDisabled={Boolean(fromValue && toValue && toValue < fromValue)}
              onClick={() => onApply()}
            >
              Apply
            </Button>
          </HStack>
        </Box>
      </Box>
    </Fragment>
  );
};

export default memo(NumberFilter) as typeof NumberFilter;
