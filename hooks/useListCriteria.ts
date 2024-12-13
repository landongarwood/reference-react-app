import { isEmpty, isEqual } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ACCOUNT_CHANGED_EVENT } from "../constants/events";
import {
  Column,
  CriteriaField,
  CriteriaInput,
  ListCriteria,
  ListCriteriaFilterParam,
  SortDirection,
  UseListCriteriaReturnValues,
} from "../types";
import { convertCriteria } from "../utils/criteria";
import { parseJsonString } from "../utils/string";
import { useCookiesLive } from "./useCookiesLive";

export const useListCriteria = (
  columns: Column[]
): UseListCriteriaReturnValues => {
  const [accountCode] = useCookiesLive(["accountCode"]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [criteriaFromUrlFirstCheckPassed, setCriteriaFromUrlFirstCheckPassed] =
    useState(false);

  const criteria: ListCriteria | null = useMemo(
    () => parseJsonString(searchParams.get("criteria")),
    [searchParams]
  );

  const setViewCriteria = useCallback(
    (newInput: CriteriaInput) => {
      const newCriteria = convertCriteria(newInput, columns);

      setSearchParams((prev) => {
        prev.set("criteria", JSON.stringify(newCriteria));
        return prev;
      });
    },
    [columns, setSearchParams]
  );

  const updateSort = useCallback(
    (field?: string, direction?: SortDirection) => {
      setSearchParams((prev) => {
        const newCriteria: ListCriteria = {
          ...criteria,
          sort: field
            ? [
                {
                  desc: direction ?? 0,
                  field,
                },
              ]
            : undefined,
        };
        prev.set("criteria", JSON.stringify(newCriteria));
        return prev;
      });
    },
    [criteria, setSearchParams]
  );

  const updateFilter = useCallback(
    (filters: ListCriteriaFilterParam[]) => {
      setSearchParams((prev) => {
        const newCriteria: ListCriteria = filters.reduce<ListCriteria>(
          (prev, curr) => ({
            ...prev,
            [curr.key]: [
              {
                ...(prev?.[curr.key]?.[0] ?? {}),
                [curr.field]: curr.values.length ? curr.values : undefined,
              },
            ],
          }),
          criteria || {}
        );
        prev.set("criteria", JSON.stringify(newCriteria));
        return prev;
      });
    },
    [criteria, setSearchParams]
  );

  const updateColumns = useCallback(
    (fields: string[]) => {
      setSearchParams((prev) => {
        const newCriteria: ListCriteria = {
          ...criteria,
          fields,
        };
        prev.set("criteria", JSON.stringify(newCriteria));
        return prev;
      });
    },
    [criteria, setSearchParams]
  );

  useEffect(() => {
    if (criteria && !criteriaFromUrlFirstCheckPassed) {
      const criteriaEq: CriteriaField = {
        ...criteria.eq?.[0],
      };

      if (accountCode) {
        // account selected - set account code in criteria
        criteriaEq.accountCode = [accountCode];
      }

      const newCriteria: ListCriteria = {
        ...criteria,
        eq: isEmpty(criteriaEq) ? undefined : [criteriaEq],
      };

      setCriteriaFromUrlFirstCheckPassed(true);

      if (!isEqual(criteria, newCriteria)) {
        setSearchParams((prev) => {
          prev.set("criteria", JSON.stringify(newCriteria));
          return prev;
        });
      }
    }
  }, [accountCode, criteria, criteriaFromUrlFirstCheckPassed, setSearchParams]);

  useEffect(() => {
    const handleAccountChange = (event: Event) => {
      const newAccountCode = (event as CustomEvent).detail;

      if (criteria) {
        const criteriaEq: CriteriaField = {
          ...criteria.eq?.[0],
        };

        if (newAccountCode) {
          // account selected - set account code in criteria
          criteriaEq.accountCode = [newAccountCode];
        } else {
          delete criteriaEq.accountCode;
        }

        const newCriteria: ListCriteria = {
          ...criteria,
          eq: [criteriaEq],
        };

        if (!isEqual(criteria, newCriteria)) {
          setSearchParams((prev) => {
            prev.set("criteria", JSON.stringify(newCriteria));
            return prev;
          });
        }
      }
    };

    window.addEventListener(ACCOUNT_CHANGED_EVENT, handleAccountChange);

    return () =>
      window.removeEventListener(ACCOUNT_CHANGED_EVENT, handleAccountChange);
  }, [criteria, setSearchParams]);

  return {
    criteria,
    setViewCriteria,
    updateColumns,
    updateFilter,
    updateSort,
  };
};
