import { lazy, ReactElement, Suspense } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProtectedRoute } from './ProtectedRoute';
import PageTitle from '../components/PageTitle';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Loader from '../common/Loader';

// Screen CheckIn
const InHouse = lazy(() => import('../pages/Dashboard/InHouse'));
const CheckInSelectKamar = lazy(
  () => import('../pages/Dashboard/CheckInSelectKamar'),
);
const CheckInForm = lazy(() => import('../pages/Dashboard/CheckInForm'));
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));

// Screen Admin
const Kamar = lazy(() => import('../pages/Admin/Kamar'));
const KamarDetails = lazy(() => import('../pages/Admin/KamarDetails'));
const KamarInput = lazy(() => import('../pages/Admin/KamarInput'));

// Buku Tamu
const Tamu = lazy(() => import('../pages/Admin/Tamu'));
const TamuInput = lazy(() => import('../pages/Admin/TamuInput'));
const TamuDetails = lazy(() => import('../pages/Admin/TamuDetails'));

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

  const routesCheckin: routesTypes[] = [
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

  const routesAdmin: routesTypes[] = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/admin/kamar',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Manajemen Kamar')} />
              <Kamar />
            </Suspense>
          ),
        },
        {
          path: '/admin/kamar/:id',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Manajemen Kamar')} />
              <KamarDetails />
            </Suspense>
          ),
        },
        {
          path: '/admin/kamar/input',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Manajemen Kamar')} />
              <KamarInput />
            </Suspense>
          ),
        },
        {
          path: '/admin/tamu',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Manajemen Tamu')} />
              <Tamu />
            </Suspense>
          ),
        },
        {
          path: '/admin/tamu/input',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Manajemen Tamu')} />
              <TamuInput />
            </Suspense>
          ),
        },
        {
          path: '/admin/tamu/:id',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Manajemen Kamar')} />
              <TamuDetails />
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
    ...routesCheckin,
    ...routesAdmin,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
