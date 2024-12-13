import { Button, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import {
  forwardRef,
  Fragment,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FACETS_DISABLED_COLUMN_IDS } from "../../../../constants/dataTable";
import { ColumnType } from "../../../../types";
import { CalendarIcon, FilterIcon } from "../../../icons";
import { useDataTableContext } from "../DataTableContext";

type Props = {
  element: string;
  type: ColumnType;
  onFacetClick: () => void;
};

const DataTableFilterInput = forwardRef<HTMLDivElement, Props>(
  ({ element, type, onFacetClick }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {
      updateFilter,
      criteria,
      setFilterFocusedColumnId,
      filterFocusedColumnId,
    } = useDataTableContext();

    const initialLikeValue =
      ((criteria.like?.[0] ?? {})[element]?.[0] as string) ?? "";

    const [inputValue, setInputValue] = useState(initialLikeValue);

    const facetsFilterDisabled = FACETS_DISABLED_COLUMN_IDS.includes(element);

    const isFilterApplied = useMemo(() => {
      if (element) {
        if (type === "text" || type === "multiText" || type === "boolean") {
          return !!criteria.eq?.[0][element] || !!criteria.like?.[0][element];
        }
        if (type === "date") {
          return (
            !!criteria.gt?.[0][element] ||
            !!criteria.lt?.[0][element] ||
            !!criteria.eq?.[0][element]
          );
        }
        if (["integer", "currency", "decimal", "percentage"].includes(type)) {
          return !!criteria.ge?.[0][element] || !!criteria.le?.[0][element];
        }
      }
      return false;
    }, [criteria, element, type]);

    const onFilterInputKeydown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          const { value } = e.target as HTMLInputElement;
          updateFilter([
            {
              field: element,
              key: "eq",
              values: [],
            },
            {
              field: element,
              key: "like",
              values: value ? [value] : [],
            },
          ]);
          inputRef.current?.blur();
        }
        if (e.key === "Escape") {
          inputRef.current?.blur();
        }
      },
      [element, updateFilter]
    );

    useEffect(() => {
      setInputValue(initialLikeValue);
    }, [initialLikeValue]);

    return (
      <InputGroup
        ref={ref}
        _hover={{
          borderColor: isFilterApplied ? "blue.400" : "gray.550",
        }}
        borderBottomWidth={isFilterApplied ? 1 : 0}
        borderColor={
          isFilterApplied || filterFocusedColumnId === element
            ? "blue.400"
            : "gray.400"
        }
        borderRadius="sm"
        color={isFilterApplied ? "blue.600" : undefined}
        data-testid={`dt-column-filter-${element}`}
        opacity={
          filterFocusedColumnId && filterFocusedColumnId !== element
            ? ".3"
            : "1"
        }
        overflow="visible"
        width={filterFocusedColumnId === element ? "100%" : "auto"}
      >
        {![
          "text",
          "multiText",
          "boolean",
          "date",
          "integer",
          "currency",
          "decimal",
          "percentage",
        ].includes(type) ? (
          <Input variant="outline" />
        ) : [
            "boolean",
            "date",
            "integer",
            "currency",
            "decimal",
            "percentage",
          ].includes(type) ? (
          <Button
            _active={{
              bg: "gray.50",
            }}
            _hover={{
              bg: "gray.50",
              borderColor: isFilterApplied ? "blue.700" : "gray.550",
            }}
            borderColor={isFilterApplied ? "blue.300" : "gray.200"}
            color={isFilterApplied ? "blue.600" : undefined}
            data-testid="dt-column-filter-facet-btn"
            gap={2}
            h={9}
            px={4}
            onClick={onFacetClick}
          >
            {type === "date" && <CalendarIcon w="14px" />}
            <FilterIcon w="14px" />
          </Button>
        ) : (
          <Fragment>
            <Input
              ref={inputRef}
              _hover={{
                borderColor: isFilterApplied ? "blue.400" : undefined,
              }}
              bg="white"
              data-filter={isFilterApplied ? "applied" : undefined}
              data-testid="dt-column-filter-input"
              fontSize="sm"
              minWidth={filterFocusedColumnId === element ? "240px" : "auto"}
              value={inputValue}
              variant="filter"
              onBlur={() => setFilterFocusedColumnId("")}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setFilterFocusedColumnId(element)}
              onKeyDown={onFilterInputKeydown}
            />
            {!facetsFilterDisabled && (
              <InputRightAddon
                children={<FilterIcon w="14px" />}
                bg="gray.50"
                borderRadius={2}
                cursor="pointer"
                data-testid="dt-column-filter-facet-btn"
                display={filterFocusedColumnId === element ? "none" : undefined}
                h={9}
                px={2}
                onClick={onFacetClick}
              />
            )}
          </Fragment>
        )}
      </InputGroup>
    );
  }
);

export default memo(DataTableFilterInput);
