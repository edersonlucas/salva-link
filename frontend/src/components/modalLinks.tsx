import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { X } from 'phosphor-react';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import api from '../services/api';
import LinkBlogCard from './linkBlogCard';
import { AuthContext } from '../contexts/AuthContext';
import ILink from '../interfaces/ILink';
import SearchAnimatedIcon from './searchAnimatedIcon';
import IllustrationSearchError from '../assets/img/illustration-search-error.svg';

interface ModalLinksProps {
  data: {
    name: string;
  };
  setModalLinksIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalLinks(props: ModalLinksProps) {
  const { data, setModalLinksIsOpen } = props;

  const { logout } = useContext(AuthContext);
  const [blogLinks, setBlogLinks] = useState<ILink[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorIsOccurring, setErrorIsOccurring] = useState(false);

  const { push } = useRouter();

  const blogName = data.name;

  const getLinksBlog = useCallback(async () => {
    const { 'salvalink.token': token } = parseCookies();
    if (!token) {
      push('/login');
    }
    setIsSearching(true);
    await api
      .get(`/blog/${blogName}`, { headers: { Authorization: token } })
      .then((response) => {
        setIsSearching(false);
        setErrorIsOccurring(false);
        setBlogLinks(response.data);
      })
      .catch((err) => {
        const status: number = err?.response?.status;
        if (status === 401) {
          logout();
        }
        setIsSearching(false);
        setErrorIsOccurring(true);
      });
  }, [push, blogName, logout]);

  useEffect(() => {
    getLinksBlog();
  }, [getLinksBlog]);

  const tryToFetchAgain = () => {
    setErrorIsOccurring(false);
    getLinksBlog();
  };

  return (
    <div className="fixed inset-0 bg-zinc-200 bg-opacity-30 w-screen h-screen">
      <div className="fixed inset-0 z-50 overflow-auto text-white-900 p-2 w-full lg:w-[75vw] h-[85vh] flex m-auto">
        <button
          type="button"
          className="bg-red-700 z-10 p-2 rounded-full absolute right-0 top-1 hover:bg-red-800 transition-colors"
          onClick={() => setModalLinksIsOpen(false)}
        >
          <X size={20} weight="bold" />
        </button>
        <div className="bg-zinc-900 p-1 lg:p-5 w-full h-[80vh] m-auto flex flex-col rounded-lg items-center justify-start">
          <h1 className="text-center text-lg lg:text-2xl">{`Sugestões do BLOG: ${data.name}`}</h1>
          {errorIsOccurring && (
            <div className="flex flex-col h-full items-center justify-center m-auto p-3">
              <Image
                src={IllustrationSearchError}
                alt="Illustration Search Error"
                width={300}
              />
              <h1 className="text-base lg:text-xl m-3 text-center">
                Ocorreu um erro ao buscar os links no blog
              </h1>
              <button
                type="button"
                className="text-white-900 text-sm w-full mt-2 bg-orange-700 uppercase py-2 lg:py-4 rounded hover:bg-orange-800 transition-colors"
                onClick={tryToFetchAgain}
              >
                TENTAR NOVAMENTE
              </button>
            </div>
          )}
          {isSearching && (
            <div className="flex flex-col h-full items-center justify-center m-auto">
              <div>
                <SearchAnimatedIcon />
                <h1 className="text-xl">Buscando no Blog...</h1>
              </div>
            </div>
          )}
          <div className="w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-600">
            {blogLinks.map((item) => (
              <LinkBlogCard key={item.link} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
