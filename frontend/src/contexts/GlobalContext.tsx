import ILink from "../interfaces/ILink";
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
  links: ILink[];
  setLinks: Dispatch<SetStateAction<ILink[]>>;
}

export const GlobalContext = createContext({} as IGlobalContext);

export function GlobalProvider({ children }: IProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [links, setLinks] = useState<ILink[]>([]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      links,
      setLinks,
    }),
    [user, setUser, links, setLinks]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
