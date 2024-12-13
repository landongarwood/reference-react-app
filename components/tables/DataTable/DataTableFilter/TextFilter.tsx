import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Header } from "@tanstack/react-table";
import { kebabCase, keys, omit } from "lodash";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import { ListingFacetValueDto } from "../../../../api";
import { useListingFacets } from "../../../../hooks/api/queries";
import { useDataTableContext } from "../DataTableContext";

type Facet = {
  isKeyword?: boolean;
} & ListingFacetValueDto;

const FILTER_OPTIONS = ["Selected", "Blank", "Not Blank"];
const FILTER_OPTION_VALUES = ["_blank_", "_not_blank_"];

const TextFilter = <TData, TValue>({
  header,
  onClose,
}: {
  header: Header<TData, TValue>;
  onClose: () => void;
}) => {
  const { listingName, criteria, updateFilter } = useDataTableContext();
  const { header: label, id: element } = header.column.columnDef;
  const [filterOption, setFilterOption] = useState<
    (typeof FILTER_OPTIONS)[number]
  >(FILTER_OPTIONS[0]);
  const [term, setTerm] = useState("");
  const [debouncedTerm] = useDebounce(term, 500);
  const initialEqValues = useMemo(
    () => ((criteria.eq?.[0] ?? {})[element ?? ""] ?? []) as string[],
    [criteria.eq, element]
  );
  const initialLikeValues = useMemo(
    () => ((criteria.like?.[0] ?? {})[element ?? ""] ?? []) as string[],
    [criteria.like, element]
  );
  const mapInitialLikeValuesToSelected = useCallback(
    (checked: boolean) =>
      initialLikeValues.reduce((prev, curr) => {
        const key = `*${curr}*`;
        return {
          ...prev,
          [key]: checked,
        };
      }, {}),
    [initialLikeValues]
  );

  const [selectedValues, setSelectedValues] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (initialLikeValues.length) {
      setSelectedValues(mapInitialLikeValuesToSelected(true));
    } else {
      setSelectedValues(
        initialEqValues.reduce(
          (prev, curr) => ({
            ...prev,
            [curr]: true,
          }),
          {}
        )
      );
    }
  }, [
    element,
    initialEqValues,
    initialLikeValues,
    mapInitialLikeValuesToSelected,
  ]);

  const { data, isLoading } = useListingFacets({
    column: element ?? "",
    criteria: {
      eq: [
        {
          ...omit(criteria.eq?.[0], [element ?? ""]),
        },
      ],
    },
    enabled: !!listingName && criteria.fields?.includes(element ?? ""),
    listingName: listingName!,
    term: debouncedTerm.trim(),
  });

  const facets = useMemo<Facet[]>(
    () => [
      ...initialLikeValues.map((value) => ({
        isKeyword: true,
        value: `*${value}*`,
      })),
      ...(data?.facets?.filter((facet) => facet.count) ?? []),
    ],
    [data?.facets, initialLikeValues]
  );
  const hasBlank = data?.hasBlanks === true;

  const onApply = useCallback(
    (option: string) => {
      if (element) {
        const cleanedSelectedValues = keys(selectedValues)
          .filter((value) => selectedValues[value])
          .reduce<Record<string, boolean>>(
            (prev, curr) => ({ ...prev, [curr]: true }),
            {}
          );

        let filterValues: string[];
        if (option === FILTER_OPTIONS[0]) {
          filterValues = keys(cleanedSelectedValues).filter(
            (value) => !FILTER_OPTION_VALUES.includes(value)
          );
        } else if (option === FILTER_OPTIONS[1]) {
          filterValues = ["_blank_"];
        } else {
          filterValues = ["_not_blank_"];
        }
        updateFilter([
          {
            field: element,
            key: "eq",
            values: filterValues,
          },
          {
            field: element,
            key: "like",
            values: [],
          },
        ]);
      }
      onClose();
    },
    [element, onClose, selectedValues, updateFilter]
  );

  const onClear = useCallback(() => {
    if (element) {
      updateFilter([
        {
          field: element,
          key: "eq",
          values: [],
        },
        {
          field: element,
          key: "like",
          values: [],
        },
      ]);
    }
    setTerm("");
    setFilterOption(FILTER_OPTIONS[0]);
    setSelectedValues({});
    onClose();
  }, [element, onClose, updateFilter]);

  const handleOptionClick = useCallback(
    (option: string) => {
      setFilterOption(option);
      if (option !== FILTER_OPTIONS[0]) {
        onApply(option);
      }
    },
    [onApply]
  );

  const onFacetChange = useCallback(
    (facet: Facet, checked: boolean) => {
      if (facet.isKeyword) {
        setSelectedValues(mapInitialLikeValuesToSelected(checked));
      } else {
        setSelectedValues((prev) => ({
          ...prev,
          ...mapInitialLikeValuesToSelected(false),
          [facet.value ?? ""]: checked,
        }));
      }
    },
    [mapInitialLikeValuesToSelected]
  );

  useEffect(() => {
    if (debouncedTerm.length === 0 || isLoading || facets.length === 0) {
      setSelectedValues({
        ...mapInitialLikeValuesToSelected(true),
      });
    } else {
      setSelectedValues({
        ...mapInitialLikeValuesToSelected(true),
        ...facets
          .filter((facet) => !facet.isKeyword && facet.value)
          .reduce<Record<string, boolean>>(
            (prev, curr) => ({
              ...prev,
              [curr.value!]: true,
            }),
            {}
          ),
      });
    }
  }, [facets, isLoading, debouncedTerm, mapInitialLikeValuesToSelected]);

  return (
    <Fragment>
      {hasBlank && (
        <Grid bgColor="gray.100" gap={2} p={2} templateColumns="repeat(3, 1fr)">
          {FILTER_OPTIONS.map((option) => (
            <GridItem key={option}>
              <Button
                colorScheme={filterOption === option ? "blue" : undefined}
                data-selected={filterOption === option}
                data-testid={`dt-text-filter-option-${kebabCase(option)}`}
                variant={filterOption === option ? "outline" : undefined}
                w="full"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            </GridItem>
          ))}
        </Grid>
      )}

      <Box px="6px" py={3}>
        <InputGroup>
          <InputLeftElement
            children={<SearchIcon color="gray.300" />}
            pointerEvents="none"
          />
          <Input
            data-testid="dt-text-filter-facet-input"
            defaultValue={filterOption === FILTER_OPTIONS[0] ? undefined : ""}
            isDisabled={filterOption !== FILTER_OPTIONS[0]}
            placeholder={`Search for ${label}`}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </InputGroup>

        <Text
          color={filterOption !== FILTER_OPTIONS[0] ? "gray.400" : undefined}
          fontSize="sm"
          fontWeight="medium"
          mt={4}
        >
          {`Filter ${label}:`}
        </Text>

        <Box py={2}>
          <Box
            alignItems="center"
            display={isLoading || !facets.length ? "flex" : "block"}
            justifyContent="center"
            maxH={24 * 10}
            minH={24 * 5}
            overflow="auto"
          >
            {isLoading ? (
              <CircularProgress isIndeterminate color="gray.400" size={6} />
            ) : !facets.length ? (
              <Text color="gray.400" fontSize="sm" fontWeight="medium">
                Not Found
              </Text>
            ) : (
              facets.map((facet) => (
                <Fragment key={facet.value}>
                  {facet.value ? (
                    <Box
                      data-disabled={filterOption !== FILTER_OPTIONS[0]}
                      h={6}
                    >
                      <Checkbox
                        data-testid={`dt-text-filter-facet-item-${kebabCase(
                          facet.value
                        )}`}
                        h="full"
                        isChecked={
                          filterOption === FILTER_OPTIONS[0]
                            ? !!selectedValues[facet.value]
                            : filterOption === FILTER_OPTIONS[2]
                        }
                        isDisabled={filterOption !== FILTER_OPTIONS[0]}
                        overflow="hidden"
                        py={1}
                        size="sm"
                        onChange={(e) => onFacetChange(facet, e.target.checked)}
                      >
                        <Tooltip
                          label={facet.value}
                          placement="bottom-start"
                          textTransform="uppercase"
                        >
                          <Text textTransform="uppercase">{facet.value}</Text>
                        </Tooltip>
                      </Checkbox>
                    </Box>
                  ) : null}
                </Fragment>
              ))
            )}
          </Box>
        </Box>

        <HStack px={2}>
          <Button
            data-testid="dt-text-filter-clear-btn"
            h={9}
            onClick={onClear}
          >
            Clear
          </Button>
          <Spacer />
          <Button
            colorScheme="blue"
            data-testid="dt-text-filter-apply-btn"
            fontSize="sm"
            h={9}
            onClick={() => onApply(filterOption)}
          >
            Apply
          </Button>
        </HStack>
      </Box>
    </Fragment>
  );
};

export default memo(TextFilter) as typeof TextFilter;
