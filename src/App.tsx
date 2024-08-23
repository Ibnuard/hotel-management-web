import { useEffect, useState } from 'react';

import Loader from './common/Loader';
import AuthProvider from './hooks/useAuth';
import Routes from './routes';

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
      <Routes />
    </AuthProvider>
  );
}

export default App;
