import Head from 'next/head';
import { useContext, useEffect, useState, FormEvent } from 'react';
import { UserCircle, EnvelopeSimple } from 'phosphor-react';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import IUser from '../interfaces/IUser';
import Header from '../components/header';
import Footer from '../components/footer';
import { PasswordUpdate } from '../enums/returnMessages.enum';
import { AuthContext } from '../contexts/AuthContext';
import InputPassword from '../components/inputPassword';
import api from '../services/api';

export default function User() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const [user, setUser] = useState<IUser | null>(null);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const isPasswordAreTheSame = repeatPassword !== password;

  useEffect(() => {
    const { 'salvalink.token': token } = parseCookies();
    api
      .get('/user', { headers: { Authorization: token } })
      .then((response) => {
        const userResponse: IUser = response.data;
        setUser(userResponse);
      })
      .catch((err) => {
        const status: number = err?.response?.status;
        if (status === 401) {
          logout();
        }
      });
  }, [logout]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { 'salvalink.token': token } = parseCookies();
    api
      .put(
        '/user/changepassword',
        { password },
        { headers: { Authorization: token } },
      )
      .then((response) => {
        const { status } = response;
        toast.success(PasswordUpdate[status]);
        setIsChangingPassword(false);
      })
      .catch((err) => {
        const { status } = err.response;
        toast.error(PasswordUpdate[status]);
      });
  };

  return (
    isAuthenticated && (
      <>
        <Head>
          <title>Usuário</title>
        </Head>
        <main className="bg-blue-600 flex flex-col w-full min-h-screen grow">
          <Header />
          <div className="p-3 lg:p-7 w-full max-w-[1300px] h-full grow mx-auto">
            <div className="flex rounded-md p-5 bg-blue-700 flex-col items-center justify-center w-full max-w-[500px] h-[75vh] mx-auto shadow">
              <span className="flex flex-col p-1 lg:p-3 items-center text-white-900">
                <UserCircle size={50} />
                <h1 className="text-xl">{user?.username}</h1>
              </span>
              <span className="flex p-1 lg:p-3 text-white-900">
                <EnvelopeSimple size={30} />
                <h1 className="text-xl">{user?.email}</h1>
              </span>
              {!isChangingPassword && (
                <button
                  type="button"
                  className="text-white-900 text-sm w-full  bg-orange-700 uppercase py-2 lg:py-4 rounded hover:bg-orange-800 transition-colors"
                  onClick={() => setIsChangingPassword(true)}
                >
                  ALTERAR SUA SENHA
                </button>
              )}
              {isChangingPassword && (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 w-full"
                >
                  <InputPassword
                    password={password}
                    setPassword={setPassword}
                    placeholder="Nova senha"
                  />
                  <InputPassword
                    password={repeatPassword}
                    setPassword={setRepeatPassword}
                    placeholder="Confirmação de senha"
                    id="repeatPassword"
                  />
                  {isPasswordAreTheSame && (
                    <span className="text-sm lg:text-base text-center p-1 text-white-900 border border-red-700 bg-red-600 rounded-md">
                      AS SENHAS DIGITADAS SÃO DIFERENTES
                    </span>
                  )}
                  <button
                    type="submit"
                    className="text-white-900 text-sm w-full bg-green-700 uppercase py-2 lg:py-4 rounded enabled:hover:bg-green-800 transition-colors disabled:opacity-40"
                    disabled={
                      isPasswordAreTheSame || !password || !repeatPassword
                    }
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="text-white-900 text-sm w-full bg-orange-700 uppercase py-2 lg:py-4 rounded hover:bg-orange-800 transition-colors"
                    onClick={() => setIsChangingPassword(false)}
                  >
                    CANCELAR
                  </button>
                </form>
              )}
            </div>
          </div>
          <Footer />
        </main>
      </>
    )
  );
}
