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
import AdminAddress from '../pages/Admin/AdminAddress';

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

// Admin Layanan Kamar
const LayananKamarAdm = lazy(() => import('../pages/Admin/LayananKamarAdm'));
const LayananKamarAdmInput = lazy(
  () => import('../pages/Admin/LayananKamarAdmInput'),
);

// Add On
const ServiceSelectKamar = lazy(
  () => import('../pages/Dashboard/ServiceSelectKamar'),
);
const ServiceDetail = lazy(() => import('../pages/Dashboard/ServiceForm'));

// setting
const Settings = lazy(() => import('../pages/Setting/Settings'));

// Aula
const AulaPaket = lazy(() => import('../pages/Admin/PaketLayananAdm'));
const AulaPaketInput = lazy(
  () => import('../pages/Admin/PaketLayananAdmInput'),
);

// Aula Sewa
const Aula = lazy(() => import('../pages/Aula/Aula'));
const AulaForm = lazy(() => import('../pages/Aula/SewaAulaForm'));
const AulaInvoice = lazy(() => import('../pages/Aula/AulaInvoice'));
const AulaPriceInput = lazy(() => import('../pages/Admin/AulaPriceInput'));

// Other
const Address = lazy(() => import('../pages/Admin/AdminAddress'));

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

  const routesService: routesTypes[] = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/order/service',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Pilih Kamar')} />
              <ServiceSelectKamar />
            </Suspense>
          ),
        },
        {
          path: '/order/service/:id',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Layanan Kamar')} />
              <ServiceDetail />
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

  const routesAula: routesTypes[] = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/aula/sewa',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Sewa Aula')} />
              <Aula />
            </Suspense>
          ),
        },
        {
          path: '/aula/sewa/form',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Sewa Aula')} />
              <AulaForm />
            </Suspense>
          ),
        },
        {
          path: '/aula/invoice',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Invoice')} />
              <AulaInvoice />
            </Suspense>
          ),
        },
        {
          path: '/aula/sewa/form/:id',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Sewa Aula')} />
              <AulaForm />
            </Suspense>
          ),
        },
        {
          path: '/aula/paket',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Paket Makanan Aula')} />
              <AulaPaket />
            </Suspense>
          ),
        },
        {
          path: '/aula/paket/input',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Paket Makanan Aula')} />
              <AulaPaketInput />
            </Suspense>
          ),
        },
        {
          path: '/aula/paket/:id',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Paket Makanan Aula')} />
              <AulaPaketInput />
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
        {
          path: '/admin/layanan-kamar',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Layanan Kamar')} />
              <LayananKamarAdm />
            </Suspense>
          ),
        },
        {
          path: '/admin/layanan-kamar/:id',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Layanan Kamar')} />
              <LayananKamarAdmInput />
            </Suspense>
          ),
        },
        {
          path: '/admin/layanan-kamar/input',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Layanan Kamar')} />
              <LayananKamarAdmInput />
            </Suspense>
          ),
        },
        {
          path: '/admin/rentprice',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Manajemen Aula')} />
              <AulaPriceInput />
            </Suspense>
          ),
        },
        {
          path: '/admin/address',
          element: (
            <Suspense fallback={<Loader />}>
              <PageTitle title={getTitle('Alamat')} />
              <Address />
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
    ...routesService,
    ...routesAula,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
