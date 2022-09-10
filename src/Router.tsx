import { Route, Routes } from 'react-router-dom';
import BillPage from './pages/bill';
import BillsPage from './pages/bills';
import HomePage from './pages/home';
import NewBillPage from './pages/newBill';
import NotFoundPage from './pages/notFound';
import ReportPage from './pages/report';

type Params = {
  path: string;
  component: ({ ...props }: any) => JSX.Element;
};

export const AppRoutes = {
  home: '/',
  bills: '/bills',
  reports: '/reports',
  catchAll: '*'
};

export default function Router() {
  const routes: Params[] = [
    // Home
    {
      path: AppRoutes.home,
      component: HomePage
    },
    // Bills
    {
      path: `${AppRoutes.bills}/new`,
      component: NewBillPage
    },
    {
      path: AppRoutes.bills,
      component: BillsPage
    },
    {
      path: `${AppRoutes.bills}/:id`,
      component: BillPage
    },
    //  Reports
    {
      path: AppRoutes.reports,
      component: ReportPage
    },
    // … rest
    {
      path: AppRoutes.catchAll,
      component: NotFoundPage
    }
  ];

  return (
    <>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </>
  );
}
