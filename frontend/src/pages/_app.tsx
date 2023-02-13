import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'animate.css/animate.min.css';
import type { AppProps } from 'next/app';
import { ToastContainer, cssTransition } from 'react-toastify';
import { AuthProvider } from '../contexts/AuthContext';
import { GlobalProvider } from '../contexts/GlobalContext';

export default function App({ Component, pageProps }: AppProps) {
  const bounce = cssTransition({
    enter: 'animate__animated animate__bounceIn',
    exit: 'animate__animated animate__bounceOut',
  });
  return (
    <GlobalProvider>
      <AuthProvider>
        <ToastContainer
          transition={bounce}
          position="bottom-center"
          autoClose={500}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <Component {...pageProps} />
      </AuthProvider>
    </GlobalProvider>
  );
}
