import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { Header } from "@tanstack/react-table";
import { camelCase } from "lodash";
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import { BOOLEAN_VALUES } from "../../../../constants/dataTable";
import { useDataTableContext } from "../DataTableContext";

const FILTER_OPTIONS = ["Both", BOOLEAN_VALUES.true, BOOLEAN_VALUES.false];

const BooleanFilter = <TData, TValue>({
  header,
  onClose,
}: {
  header: Header<TData, TValue>;
  onClose: () => void;
}) => {
  const { criteria, updateFilter } = useDataTableContext();
  const { header: label, id: element } = header.column.columnDef;
  const initialValue = criteria.eq?.[0]?.[element ?? ""]?.[0];
  const initialOption =
    initialValue === true
      ? FILTER_OPTIONS[1]
      : initialValue === false
      ? FILTER_OPTIONS[2]
      : FILTER_OPTIONS[0];

  const [filterOption, setFilterOption] =
    useState<(typeof FILTER_OPTIONS)[number]>(initialOption);

  useEffect(() => {
    setFilterOption(initialOption);
  }, [initialOption]);

  const handleOptionClick = useCallback(
    (option: string) => {
      setFilterOption(option);

      if (element) {
        updateFilter([
          {
            field: element,
            key: "eq",
            values: option === FILTER_OPTIONS[0] ? [] : [option],
          },
        ]);
      }
      onClose();
    },
    [element, onClose, updateFilter]
  );

  return (
    <Fragment>
      <Box px="6px" py={3}>
        <Text fontSize="sm" fontWeight="medium">
          {`Filter by ${label}:`}
        </Text>
      </Box>
      <Grid bgColor="gray.100" gap={2} p={2} templateColumns="repeat(3, 1fr)">
        {FILTER_OPTIONS.map((option) => (
          <GridItem key={option}>
            <Button
              colorScheme={filterOption === option ? "blue" : undefined}
              data-testid={`dt-boolean-filter-option-${camelCase(option)}`}
              variant={filterOption === option ? "outline" : undefined}
              w="full"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Fragment>
  );
};

export default memo(BooleanFilter) as typeof BooleanFilter;
