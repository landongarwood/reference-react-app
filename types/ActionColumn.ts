export type ActionColumnItem<TData> = {
  label: string;
  isVisible: ActionColumnItemVisibilityCondition<TData>;
  onClick?: ActionColumnItemActor<TData>;
};
export type ActionColumnItemActor<TData> = (entity: TData) => void;

export type ActionColumnItemVisibilityCondition<TData> = (
  entity: TData
) => boolean;
