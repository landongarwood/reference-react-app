export type CriteriaField = {
  [key: string]: FilterValue[] | undefined;
};

export type CriteriaInput = string | ListCriteriaV1 | ListCriteria | undefined;
export type FilterValue = string | number | boolean;

type ListCriteriaFilter = {
  eq?: [CriteriaField];
  like?: [CriteriaField];
  ge?: [CriteriaField];
  gt?: [CriteriaField];
  le?: [CriteriaField];
  lt?: [CriteriaField];
  ne?: [CriteriaField];
};
export type ListCriteria = ListCriteriaFilter & {
  sort?: [{ field: string; desc: 0 | 1 | "0" | "1" }];
  fields?: string[];
};

export type ListCriteriaFilterParam = {
  key: ListCriteriaKey;
  field: string;
  values: FilterValue[];
};

export type ListCriteriaKey = keyof ListCriteriaFilter;

export type ListCriteriaV1 = {
  o?: string; // field which to order by
  d?: SortDirection; // direction which to order by.
  r?: number; // number of rows to return
  fs?: {
    [key: string]:
      | FilterValue[]
      | string
      | { start?: string; end?: string }
      | undefined;
  }; // filter set to apply
  disp?: string[]; // columns to display
};

export type SortDirection = 0 | 1; // 0: ascending, 1: descending

export type UseListCriteriaReturnValues = {
  criteria: ListCriteria | null;
  setViewCriteria: (criteriaInput: CriteriaInput) => void;
  updateColumns: (fields: string[]) => void;
  updateFilter: (filters: ListCriteriaFilterParam[]) => void;
  updateSort: (field?: string, direction?: SortDirection) => void;
};
