import { useQuery } from "@tanstack/react-query";
import { LicenseProgramResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useLicensePrograms = () => {
  return useQuery([QUERY_KEYS["license-programs"]], () =>
    LicenseProgramResourceService.getLicenseProgramsUsingGet()
  );
};
