import Head from "next/head";
import { parseCookies } from "nookies";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import Header from "../components/header";
import LinkCard from "../components/linkCard";
import { PlusCircle } from "phosphor-react";
import ModalAddLink from "../components/modalAddLink";
import IllustrationNotFoundLink from "../assets/img/illustation-home-not-found-links.svg";
import Image from "next/image";
import Footer from "../components/footer";

export default function Home() {
  const { push } = useRouter();

  const { logout, isAuthenticated } = useContext(AuthContext);
  const { links, setLinks } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false);

  useEffect(() => {
    const { "salvalink.token": token } = parseCookies();
    if (!token) {
      push("/login");
    }
    api
      .get("/link", { headers: { Authorization: token } })
      .then((response) => setLinks(response.data))
      .catch((err) => {
        if (err.response.status === 401) {
          logout();
        }
      });
  }, [logout, push, setLinks]);

  return (
    isAuthenticated && (
      <>
        <Head>
          <title>Início</title>
        </Head>
        <main className="bg-blue-600 flex flex-col w-full min-h-screen grow">
          <Header />
          <div className="p-3 lg:p-7 w-full max-w-[1300px] h-full grow mx-auto">
            <div className="flex flex-col items-center mb-6 gap-3 lg:flex-row">
              <input
                className="bg-zinc-600 px-5 h-11 w-full placeholder-gray-700"
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button
                type="button"
                className="flex items-center justify-center bg-green-700 text-sm lg:text-base p-1 lg:p-2 w-full lg:w-1/4 rounded-sm hover:bg-green-800 transition-colors text-white-900"
                onClick={() => setModalAddIsOpen(true)}
              >
                <PlusCircle size={30} />
                ADICIONAR
              </button>
            </div>
            <div className="flex flex-col gap-3 w-full h-[60vh] lg:h-[70vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-600">
              {links.length > 0 ? (
                links
                  .filter(
                    (link) =>
                      link.title.toLowerCase().includes(search.toLowerCase()) ||
                      link.link.toLowerCase().includes(search.toLowerCase())
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
