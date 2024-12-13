import { ReactElement } from "react";
import { createGlobalState } from "react-hooks-global-state";
import { AccountDetailsDto } from "../../api";

export type GlobalState = {
  pageTitle: string | ReactElement;
  isMobleNavMenuOpened: boolean;
  isMobileProfileMenuOpened: boolean;
  contentWidth: number;
  contentWidthThreshold: number;
  account?: AccountDetailsDto;
};

const initialState: GlobalState = {
  account: undefined,
  contentWidth: 0,
  contentWidthThreshold: 0,
  isMobileProfileMenuOpened: false,
  isMobleNavMenuOpened: false,
  pageTitle: "",
};

const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };
