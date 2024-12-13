import Cookies from "js-cookie";
import { isString } from "lodash";
import { useCallback, useMemo } from "react";

export const useSavedApiResult = <TData extends {}>(
  key: string
): [TData | null, (data: TData) => void] => {
  const saveResult = useCallback(
    (data: TData) => {
      Cookies.set(key, JSON.stringify(data), {
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
      });
    },
    [key]
  );

  const savedResult = useMemo(() => {
    try {
      const savedData = Cookies.get(key);
      if (isString(savedData)) {
        return JSON.parse(savedData) as TData;
      }
    } catch {}
    return null;
  }, [key]);

  return [savedResult, saveResult];
};
