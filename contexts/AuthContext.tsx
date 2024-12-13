import Cookies from "js-cookie";
import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { OpenAPI } from "../api";

export const AUTH_COOKIE_KEY = "api_token";
const TOKEN_REFRESH_TIMEOUT = 5000;

type AuthContextState = {
  token?: string;
};

const AuthContext = createContext<AuthContextState>({});

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [token, setToken] = useState<string | undefined>(
    Cookies.get(AUTH_COOKIE_KEY)
  );
  OpenAPI.TOKEN = Cookies.get(AUTH_COOKIE_KEY);

  const refreshToken = useCallback(() => {
    const cookieToken = Cookies.get(AUTH_COOKIE_KEY);
    OpenAPI.TOKEN = cookieToken;
    setToken(cookieToken);
  }, []);

  useEffect(() => {
    refreshToken();

    const interval = setInterval(() => {
      refreshToken();
    }, TOKEN_REFRESH_TIMEOUT);

    return () => {
      clearInterval(interval);
    };
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
