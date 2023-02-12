import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState, useContext, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { Envelope } from 'phosphor-react';
import InputPassword from '../components/inputPassword';
import { AuthContext } from '../contexts/AuthContext';
import Logo from '../assets/img/logo.svg';
import IllustrationLogin from '../assets/img/illustration-login.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const { push } = useRouter();

  useEffect(() => {
    const { 'salvalink.token': token } = parseCookies();
    if (token) {
      push('/');
    }
  }, [push]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await login({ email, password });
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex w-screen h-screen bg-white-900 lg:flex-row mx-auto items-center">
        <div className="w-full h-full items-center justify-end content-end hidden bg-blue-600 lg:flex lg:flex-col">
          <div className="p-3">
            <h1 className="text-white-900 text-4xl font-bold">
              Seus links em um só lugar.
            </h1>
          </div>
          <Image
            src={IllustrationLogin}
            alt="Illustration Login"
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
              <label className="relative" htmlFor="loginEmail">
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
                  id="loginEmail"
                />
              </label>
              <InputPassword password={password} setPassword={setPassword} />
              <span className="text-black-900 text-center">
                Não tem conta?{' '}
                <Link className="font-semibold" href="/register">
                  Cadastre-se
                </Link>
              </span>
              <button
                className="text-white-900 text-sm w-full mt-2 bg-blue-900 uppercase py-4 rounded hover:bg-blue-800 transition-colors"
                type="submit"
              >
                ENTRAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
