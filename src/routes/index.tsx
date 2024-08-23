import { lazy, ReactElement, Suspense } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProtectedRoute } from './ProtectedRoute';
import PageTitle from '../components/PageTitle';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Loader from '../common/Loader';

const InHouse = lazy(() => import('../pages/Dashboard/InHouse'));
const CheckInSelectKamar = lazy(
  () => import('../pages/Dashboard/CheckInSelectKamar'),
);
const CheckInForm = lazy(() => import('../pages/Dashboard/CheckInForm'));
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));

const Routes = () => {
  const { token } = useAuth();

  const getTitle = (title: string) => `Anggrek Inn 2 - ${title}`;

  type routesTypes = {
    path: string;
    element: ReactElement;
    children?: childRoute[];
  };

  type childRoute = {
    path: string;
    element: ReactElement;
  };

  const routesForAuthenticated: routesTypes[] = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('In House')} />
              <InHouse />
            </Suspense>
          ),
        },
        {
          path: '/order/checkin',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Pilih Kamar')} />
              <CheckInSelectKamar />
            </Suspense>
          ),
        },
        {
          path: '/order/checkin/form',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Check In')} />
              <CheckInForm />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ];

  const routesForUnAuth: routesTypes[] = [
    {
      path: '/login',
      element: (
        <Suspense fallback={<Loader />}>
          <PageTitle title={getTitle('Login')} />
          <SignIn />
        </Suspense>
      ),
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForUnAuth : []),
    ...routesForAuthenticated,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
