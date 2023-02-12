import Head from 'next/head';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/header';
import BlogCard from '../components/blogCard';
import Footer from '../components/footer';
import { GlobalContext } from '../contexts/GlobalContext';

export default function Suggestions() {
  const { getLinksUser } = useContext(GlobalContext);

  const { logout, isAuthenticated } = useContext(AuthContext);

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
          <title>Sugestões</title>
        </Head>
        <main className="bg-blue-600 flex flex-col w-full min-h-screen grow">
          <Header />
          <div className="p-3 lg:p-7 w-full max-w-[1300px] h-full grow mx-auto">
            <div className="flex flex-wrap w-full h-[75vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-600">
              <BlogCard data={{ name: 'DevGo' }} />
              <BlogCard data={{ name: 'Trybe' }} />
              <BlogCard data={{ name: 'Tecnoblog' }} />
            </div>
          </div>
          <Footer />
        </main>
      </>
    )
  );
}
