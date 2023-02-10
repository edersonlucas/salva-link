import React, {
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

import IProviderProps from "../interfaces/IProviderProps";

import IUser from "../interfaces/IUser";

interface IGlobalContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

export const GlobalContext = createContext({} as IGlobalContext);

export function GlobalProvider({ children }: IProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
