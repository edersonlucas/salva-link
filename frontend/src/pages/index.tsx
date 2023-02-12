import Head from 'next/head';
import { useEffect, useState, useContext } from 'react';
import { PlusCircle, XCircle } from 'phosphor-react';
import Image from 'next/image';
import { AuthContext } from '../contexts/AuthContext';
import { GlobalContext } from '../contexts/GlobalContext';
import Header from '../components/header';
import LinkCard from '../components/linkCard';
import ModalAddLink from '../components/modalAddLink';
import IllustrationNotFoundLink from '../assets/img/illustation-home-not-found-links.svg';
import Footer from '../components/footer';

export default function Home() {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const { getLinksUser, links } = useContext(GlobalContext);
  const [search, setSearch] = useState('');
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false);

  useEffect(() => {
    const getLinks = async () => {
      try {
        await getLinksUser();
      } catch (e) {
        logout();
      }
    };
    getLinks();
  }, [getLinksUser, logout]);

  return (
    isAuthenticated && (
      <>
        <Head>
          <title>Início</title>
        </Head>
        <main className="bg-blue-600 flex flex-col w-screen min-h-screen grow">
          <Header />
          <div className="p-3 lg:p-7 w-full max-w-[1300px] h-full grow mx-auto">
            <div className="flex flex-col items-center mb-6 gap-3 lg:flex-row">
              <div className="w-full relative">
                <input
                  className="bg-zinc-600 px-5 h-11 w-full placeholder-gray-700"
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                {search && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-zinc-700 hover:text-zinc-800 transition-colors"
                    onClick={() => setSearch('')}
                  >
                    <XCircle size={31} />
                  </button>
                )}
              </div>
              <button
                type="button"
                className="flex items-center justify-center bg-green-700 text-sm lg:text-base p-1 lg:p-2 w-full lg:w-1/4 rounded-sm hover:bg-green-800 transition-colors text-white-900"
                onClick={() => setModalAddIsOpen(true)}
              >
                <PlusCircle size={30} />
                ADICIONAR
              </button>
            </div>
            <div className="w-full h-[60vh] lg:h-[65vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-600">
              {links.length ? (
                links
                  .filter(
                    (link) =>
                      link.title.toLowerCase().includes(search.toLowerCase()) ||
                      link.link.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((link) => <LinkCard key={link.id} data={link} />)
              ) : (
                <div className="flex flex-col justify-end h-[60vh] items-center gap-6">
                  <h1 className="text-2xl text-white-900">
                    Você ainda não salvou nenhum link...
                  </h1>
                  <Image
                    src={IllustrationNotFoundLink}
                    alt="Illustration Link not found"
                    width={500}
                  />
                </div>
              )}
            </div>
          </div>
          {modalAddIsOpen && (
            <ModalAddLink setModalAddIsOpen={setModalAddIsOpen} />
          )}
          <Footer />
        </main>
      </>
    )
  );
}
