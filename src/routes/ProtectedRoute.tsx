import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const { token } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};
