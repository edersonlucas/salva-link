import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState, useContext, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { Envelope, User } from 'phosphor-react';
import InputPassword from '../components/inputPassword';
import { AuthContext } from '../contexts/AuthContext';
import Logo from '../assets/img/logo.svg';
import IllustrationRegister from '../assets/img/illustration-register.svg';
import Spinner from '../components/spinner';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    const { 'salvalink.token': token } = parseCookies();
    if (token) {
      push('/');
    }
  }, [push]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    await register({ username, email, password });
    setIsLoading(false);
  }

  return (
    <>
      <Head>
        <title>Cadastrar</title>
      </Head>
      <div className="flex w-screen h-screen bg-white-900 lg:flex-row mx-auto items-center">
        <div className="w-full h-full items-center justify-end content-end hidden bg-blue-600 lg:flex lg:flex-col">
          <div className="p-3">
            <h1 className="text-white-900 text-4xl font-bold">
              Crie sua conta e comece a salvar seus links.
            </h1>
          </div>
          <Image
            className="mt-14"
            src={IllustrationRegister}
            alt="Illustration Register"
            objectFit="cover"
          />
        </div>
        <div className="w-full flex justify-center bg-white-900">
          <div className="max-w-lg p-3 flex flex-col grow items-center">
            <Image
              className="mb-6"
              src={Logo}
              alt="Logo SalvaLink"
              width={170}
            />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full p-2"
            >
              <label className="relative" htmlFor="registerUsername">
                <User
                  className="text-zinc-800 absolute left-3 bottom-[.9rem]"
                  size={25}
                />
                <input
                  className="bg-zinc-600 rounded px-5 h-14 w-full pl-11 placeholder-gray-700"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  id="registerUsername"
                />
              </label>
              <label className="relative" htmlFor="registerEmail">
                <Envelope
                  className="text-zinc-800 absolute left-3 bottom-[.9rem]"
                  size={25}
                />
                <input
                  className="bg-zinc-600 rounded px-5 h-14 w-full pl-11 placeholder-gray-700"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  id="registerEmail"
                />
              </label>
              <InputPassword password={password} setPassword={setPassword} />

              <span className="text-black-900 text-center">
                Já tem conta?{' '}
                <Link className="font-semibold" href="/login">
                  Entrar
                </Link>
              </span>
              <button
                className="text-white-900 text-sm w-full mt-2 bg-blue-900 uppercase py-4 rounded enabled:hover:bg-blue-800 transition-colors disabled:opacity-40 gap-2 flex justify-center"
                type="submit"
                disabled={!username || !email || !password || isLoading}
              >
                CADASTRAR
                {isLoading && <Spinner />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
