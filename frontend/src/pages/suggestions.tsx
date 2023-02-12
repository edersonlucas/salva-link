import Head from 'next/head';
import { useEffect, useContext, useState } from 'react';
import { parseCookies } from 'nookies';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/header';
import BlogCard from '../components/blogCard';
import Footer from '../components/footer';
import { GlobalContext } from '../contexts/GlobalContext';
import IBlog from '../interfaces/IBlog';
import api from '../services/api';

export default function Suggestions() {
  const { getLinksUser } = useContext(GlobalContext);

  const [blogs, setBlogs] = useState<IBlog[]>([]);
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
    const { 'salvalink.token': token } = parseCookies();
    api
      .get('/blog', { headers: { Authorization: token } })
      .then((response) => {
        const blogsResponse: IBlog[] = response.data;
        setBlogs(blogsResponse);
      })
      .catch((err) => {
        const status: number = err?.response?.status;
        if (status === 401) {
          logout();
        }
      });
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
              {blogs?.map((blog) => (
                <BlogCard key={blog.name} data={blog} />
              ))}
            </div>
          </div>
          <Footer />
        </main>
      </>
    )
  );
}
