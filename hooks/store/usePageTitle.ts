import { useGlobalState } from "./base";

const usePageTitle = () => useGlobalState("pageTitle");

export default usePageTitle;
