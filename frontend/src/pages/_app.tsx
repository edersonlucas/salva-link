import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/AuthContext';
import { GlobalProvider } from '../contexts/GlobalContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
      </AuthProvider>
    </GlobalProvider>
  );
}
