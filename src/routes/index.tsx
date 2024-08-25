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

// Auth
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));

// Screen CheckIn
const InHouse = lazy(() => import('../pages/Dashboard/InHouse'));
const CheckInSelectKamar = lazy(
  () => import('../pages/Dashboard/CheckInSelectKamar'),
);
const CheckInForm = lazy(() => import('../pages/Dashboard/CheckInForm'));
const CheckInEdit = lazy(() => import('../pages/Dashboard/CheckInEdit'));
const Invoice = lazy(() => import('../pages/Dashboard/Invoice'));
const History = lazy(() => import('../pages/Dashboard/History'));
const HistoryDetails = lazy(() => import('../pages/Dashboard/HistoryDetails'));

// Screen CheckIn
const CheckOutSelectKamar = lazy(
  () => import('../pages/Dashboard/CheckOutSelectKamar'),
);
const CheckOutForm = lazy(() => import('../pages/Dashboard/CheckOutForm'));
const CheckOutToday = lazy(() => import('../pages/Dashboard/CheckoutToday'));

// Screen Admin
const Kamar = lazy(() => import('../pages/Admin/Kamar'));
const KamarDetails = lazy(() => import('../pages/Admin/KamarDetails'));
const KamarInput = lazy(() => import('../pages/Admin/KamarInput'));

// Buku Tamu
const Tamu = lazy(() => import('../pages/Admin/Tamu'));
const TamuInput = lazy(() => import('../pages/Admin/TamuInput'));
const TamuDetails = lazy(() => import('../pages/Admin/TamuDetails'));

// Tipe kamar
const TipeKamar = lazy(() => import('../pages/Admin/TipeKamar'));
const TipeKamarDetails = lazy(() => import('../pages/Admin/TipeKamarDetails'));
const TipeKamarInput = lazy(() => import('../pages/Admin/TipeKamarInput'));

// setting
const Settings = lazy(() => import('../pages/Setting/Settings'));

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
        {
          path: '/order/checkin/edit',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Edit Check In')} />
              <CheckInEdit />
            </Suspense>
          ),
        },
        {
          path: '/checkout-today',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Check Out')} />
              <CheckOutToday />
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

  const routesCheckout: routesTypes[] = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/order/checkout',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Pilih Kamar')} />
              <CheckOutSelectKamar />
            </Suspense>
          ),
        },
        {
          path: '/order/checkout/form',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Check Out')} />
              <CheckOutForm />
            </Suspense>
          ),
        },
        {
          path: '/order/checkout/invoice',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Invoice')} />
              <Invoice />
            </Suspense>
          ),
        },
        {
          path: '/order/history',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Riwayat')} />
              <History />
            </Suspense>
          ),
        },
        {
          path: '/order/history/details',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Riwayat')} />
              <HistoryDetails />
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
        {
          path: '/admin/tipe-kamar',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Manajemen Kamar')} />
              <TipeKamar />
            </Suspense>
          ),
        },
        {
          path: '/admin/tipe-kamar/:id',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Manajemen Kamar')} />
              <TipeKamarDetails />
            </Suspense>
          ),
        },
        {
          path: '/admin/tipe-kamar/input',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Manajemen Tamu')} />
              <TipeKamarInput />
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

  const routesSetting: routesTypes[] = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/settings',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Pengaturan')} />
              <Settings />
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
    ...routesCheckout,
    ...routesSetting,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
