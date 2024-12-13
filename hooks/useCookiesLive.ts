import Cookies from "js-cookie";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";

const getCookies = (keys: string[]) => keys.map((key) => Cookies.get(key));

export const useCookiesLive = (keys: string[]) => {
  const [values, setValues] = useState<(string | undefined)[]>(
    getCookies(keys)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newCookies = getCookies(keys);
      if (!isEqual(newCookies, values)) {
        setValues(newCookies);
      }
    }, 500);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(keys), JSON.stringify(values)]);

  return values;
};
