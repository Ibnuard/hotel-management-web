import { useEffect, useState } from 'react';

import Loader from './common/Loader';
import AuthProvider from './hooks/useAuth';
import Routes from './routes';
import { ModalProvider } from './components/Provider/ModalProvider';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
