import { useGlobalState } from "./base";

const useMobileProfileMenuOpened = () =>
  useGlobalState("isMobileProfileMenuOpened");

export default useMobileProfileMenuOpened;
