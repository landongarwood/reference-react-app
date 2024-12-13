import { isArray, isEmpty, keys } from "lodash";
import {
  CriteriaField,
  FilterValue,
  ListCriteria,
  ListCriteriaV1,
  Column,
  DateFilterOptionValue,
} from "../types";
import { isValidDateString } from "./datetime";

const isValidDateRangeString = (value: string) => {
  const validOptions: DateFilterOptionValue[] = [
    "today",
    "yesterday",
    "tomorrow",
    "priorbusinessday",
    "nextbusinessday",
  ];

  if (
    validOptions.includes(value as DateFilterOptionValue) ||
    value.endsWith("before") ||
    value.endsWith("after") ||
    value.startsWith("start") ||
    value.startsWith("end")
  ) {
    return true;
  }

  return false;
};

export const buildLegacyCriteriaUrl = (
  fs: Record<string, any>,
  disp?: string[],
  o?: string
) => {
  const criteria: ListCriteriaV1 = { disp, fs, o };
  const searchParams = new URLSearchParams();
  searchParams.set("params", JSON.stringify(criteria));
  return searchParams.toString();
};

export const convertCriteria = (
  criteriaInput: string | ListCriteria | ListCriteriaV1 | undefined,
  columns: Column[]
): ListCriteria => {
  const criteriaObject: ListCriteria | ListCriteriaV1 | undefined =
    typeof criteriaInput === "string"
      ? JSON.parse(criteriaInput)
      : criteriaInput;

  if (!criteriaObject) {
    return {};
  }
  const criteriaV1 = criteriaObject as ListCriteriaV1;
  if (criteriaV1.disp || criteriaV1.fs) {
    const criteria: ListCriteria = {};
    criteria.fields = criteriaV1.disp;

    if (criteriaV1.o) {
      criteria.sort = [
        {
          desc: criteriaV1.d ?? 0,
          field: criteriaV1.o,
        },
      ];
    }

    if (criteriaV1.fs) {
      const eq: CriteriaField = {};
      const ge: CriteriaField = {};
      const le: CriteriaField = {};

      keys(criteriaV1.fs).forEach((element) => {
        const columnType =
          columns.find((column) => column.element === element)?.type ?? "text";
        const elementValue = criteriaV1.fs?.[element];
        if (isArray(elementValue)) {
          // should be converted into eq
          if (columnType === "boolean") {
            eq[element] = elementValue.map((value) =>
              value === "y" ||
              value === "yes" ||
              value === "true" ||
              value === true ||
              value === 1
                ? true
                : false
            );
          } else {
            eq[element] = elementValue as FilterValue[];
          }
        } else if (typeof elementValue === "string") {
          // ignore
        } else if (elementValue?.start || elementValue?.end) {
          // should be converted into gt
          if (elementValue?.start) {
            const startString = elementValue.start;
            if (isValidDateString(startString)) {
              ge[element] = [startString];
            }

            if (isValidDateRangeString(startString)) {
              ge[element] = [startString];
            }
          }
          if (elementValue?.end) {
            // should be converted into lt
            const endString = elementValue.end;
            if (isValidDateString(endString)) {
              le[element] = [endString];
            }

            if (isValidDateRangeString(endString)) {
              le[element] = [endString];
            }
          }
        }
      });

      if (!isEmpty(eq)) {
        criteria.eq = [eq];
      }
      if (!isEmpty(ge)) {
        criteria.ge = [ge];
      }
      if (!isEmpty(le)) {
        criteria.le = [le];
      }
    }

    return criteria;
  }
  return criteriaObject as ListCriteria;
};

export const getMaxIdCriteria = (identifier: string) => {
  const criteria: ListCriteria = {
    fields: [identifier],
    sort: [{ desc: "1", field: identifier }],
  };
  return criteria;
};

export const getValidFiltersOnly = (
  columns: Column[],
  filter?: [CriteriaField]
): [CriteriaField] | undefined =>
  filter
    ? [
        keys(filter[0])
          .filter((field) => columns.find((c) => c.element === field))
          .reduce(
            (prev, curr) => ({
              ...prev,
              [curr]: filter[0][curr],
            }),
            {}
          ),
      ]
    : filter;
