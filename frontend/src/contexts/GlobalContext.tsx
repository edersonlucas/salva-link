import React, {
  createContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ILink from '../interfaces/ILink';
import api from '../services/api';
import addLinkDTO from '../dto/addLinkDTO';

import IProviderProps from '../interfaces/IProviderProps';

import IUser from '../interfaces/IUser';
import { AddMessage, UpdateMessage } from '../enums/returnMessages.enum';
import editLinkDTO from '../dto/editLinkDTO';

interface IGlobalContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  links: ILink[];
  setLinks: Dispatch<SetStateAction<ILink[]>>;
  addNewLink: (data: addLinkDTO, type?: string) => Promise<void>;
  editLink: (data: editLinkDTO) => Promise<void>;
  removeLink: (id: number) => Promise<void>;
  getLinksUser: () => Promise<void>;
}

export const GlobalContext = createContext({} as IGlobalContext);

export function GlobalProvider({ children }: IProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [links, setLinks] = useState<ILink[]>([]);

  const { push } = useRouter();

  const addNewLink = useCallback(
    async ({ title, link }: addLinkDTO, type = 'add') => {
      const { 'salvalink.token': token } = parseCookies();
      await api
        .post('/link/', { title, link }, { headers: { Authorization: token } })
        .then((response) => {
          const updatedLinks = [...links, response.data];
          setLinks(updatedLinks);
          if (type !== 'save') {
            const { status } = response;
            toast.success(AddMessage[status]);
          }
          toast.success('Link salvo com sucesso!');
        })
        .catch((err) => {
          const { status } = err.response;
          if (type !== 'save') {
            toast.error(AddMessage[status]);
            throw new Error(AddMessage[status]);
          }
          toast.error('Ocorreu um erro ao salvar o link');
        });
    },
    [links],
  );

  const editLink = useCallback(
    async ({ id, title, link }: editLinkDTO) => {
      const { 'salvalink.token': token } = parseCookies();
      await api
        .put(
          `/link/${id}`,
          { title, link },
          { headers: { Authorization: token } },
        )
        .then((response) => {
          const updatedLinks = links.map((item) => {
            if (item.id === id) {
              item.title = title;
              item.link = link;
            }
            return item;
          });
          setLinks(updatedLinks);
          const { status } = response;
          toast.success(UpdateMessage[status]);
        })
        .catch((err) => {
          const { status } = err.response;
          toast.error(UpdateMessage[status]);
          throw new Error(UpdateMessage[status]);
        });
    },
    [links],
  );

  const removeLink = useCallback(
    async (id: number) => {
      const { 'salvalink.token': token } = parseCookies();
      await api
        .delete(`/link/${id}`, { headers: { Authorization: token } })
        .then((_response) => {
          const updatedLinks = links.filter((item) => item.id !== id);
          setLinks(updatedLinks);
          toast.success('Link removido com sucesso!');
        })
        .catch((_err) => {
          toast.error('Ocorreu algum erro!');
        });
    },
    [links],
  );

  const getLinksUser = useCallback(async () => {
    const { 'salvalink.token': token } = parseCookies();
    if (!token) {
      push('/login');
    }
    api
      .get('/link', { headers: { Authorization: token } })
      .then((response) => setLinks(response.data))
      .catch((err) => {
        const status: number = err?.response?.status;
        if (status === 401) {
          throw new Error('Usuário não autenticado');
        }
      });
  }, [push]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      links,
      setLinks,
      addNewLink,
      editLink,
      removeLink,
      getLinksUser,
    }),
    [
      user,
      setUser,
      links,
      setLinks,
      addNewLink,
      editLink,
      removeLink,
      getLinksUser,
    ],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
