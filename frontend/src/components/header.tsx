import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { List, X, User } from 'phosphor-react';
import Link from 'next/link';
import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import { parseCookies } from 'nookies';
import { AuthContext } from '../contexts/AuthContext';
import { GlobalContext } from '../contexts/GlobalContext';
import LogoWhite from '../assets/img/logo-white.svg';
import IPayloadJWT from '../interfaces/IPayloadJWT';
import ModalLogout from './modalLogout';

export default function Header() {
  const { user, setUser } = useContext(GlobalContext);
  const { logout } = useContext(AuthContext);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { pathname } = useRouter();

  useEffect(() => {
    const { 'salvalink.token': token } = parseCookies();
    try {
      const payload: IPayloadJWT = jwtDecode(token);
      setUser({
        id: payload.sub,
        username: payload.username,
        email: payload.email,
      });
    } catch (_err) {
      logout();
    }
  }, [setUser, logout]);

  const handleLogout = () => {
    setIsOpenMenu(false);
    setModalIsOpen(true);
  };

  const openMenu = () => {
    if (isOpenMenu) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    setIsOpenMenu(!isOpenMenu);
  };
  return (
    <header className=" bg-blue-700 w-full">
      <div className="p-3 flex justify-between items-center w-full max-w-[1300px] mx-auto text-white-900">
        <div className="flex items-center gap-3 lg:gap-10">
          <Link href="/">
            <Image src={LogoWhite} alt="Logo SalvaLink" width={70} />
          </Link>
          <Link
            className={`flex hover:opacity-90 ${
              pathname === '/user' && 'bg-blue-600 p-2 rounded-md shadow'
            }`}
            href="/user"
          >
            <User size={23} />
            {user?.username}
          </Link>
        </div>
        <button
          type="button"
          name="menu-sandwich"
          className="block hover:text-blue-600 lg:hidden"
          onClick={openMenu}
        >
          {isOpenMenu ? <X size={35} /> : <List size={35} />}
        </button>
        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="/"
            className={`hover:opacity-90 ${
              pathname === '/' && 'bg-blue-600 px-3 rounded-md shadow'
            } `}
          >
            Início
          </Link>
          <Link
            href="/suggestions"
            className={`hover:opacity-90 ${
              pathname === '/suggestions' &&
              'bg-blue-600 px-3 rounded-md shadow'
            } `}
          >
            Sugestões
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1 hover:opacity-90"
          >
            Sair
          </button>
        </nav>
        <div
          className={`fixed left-0 bottom-[-71px] h-full w-full z-30 bg-blue-600 bg-opacity-[99%] transform-gpu transition-all lg:hidden ${
            isOpenMenu ? '-translate-y-0' : 'translate-y-full'
          }`}
        >
          <nav className="h-full flex flex-col items-center justify-center gap-8 text-white-900 text-2xl">
            <Link
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              href="/"
              className={`hover:opacity-90 ${
                pathname === '/' && 'bg-blue-700 px-20 rounded-md shadow'
              } `}
            >
              Início
            </Link>
            <Link
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              href="/suggestions"
              className={`hover:opacity-90 ${
                pathname === '/suggestions' &&
                'bg-blue-700 px-20 rounded-md shadow'
              } `}
            >
              Sugestões
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1 hover:opacity-90"
            >
              Sair
            </button>
          </nav>
        </div>
      </div>
      <hr className="border-blue-600 w-4/5 mx-auto opacity-30" />
      {modalIsOpen && <ModalLogout setModalIsOpen={setModalIsOpen} />}
    </header>
  );
}
