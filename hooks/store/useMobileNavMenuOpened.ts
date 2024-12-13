import { useGlobalState } from "./base";

const useMobileNavMenuOpened = () => useGlobalState("isMobleNavMenuOpened");

export default useMobileNavMenuOpened;
