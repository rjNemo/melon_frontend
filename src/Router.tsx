import { Route, Switch } from 'react-router-dom';
import BillPage from './pages/bill';
import BillsPage from './pages/bills';
import HomePage from './pages/home';
import NewBillPage from './pages/newBill';
import NotFoundPage from './pages/notFound';
import ReportPage from './pages/report';

type RouteConfig = {
  path: string;
  component: ({ ...props }: any) => JSX.Element;
  exact?: boolean;
};

export const AppRoutes = {
  home: '/',
  bills: '/bills',
  reports: '/reports',
  catchAll: '*'
};

export default function Router() {
  const routes: RouteConfig[] = [
    // Home
    {
      path: AppRoutes.home,
      component: HomePage,
      exact: true
    },
    // Bills
    {
      path: `${AppRoutes.bills}/new`,
      component: NewBillPage,
      exact: true
    },
    {
      path: AppRoutes.bills,
      component: BillsPage,
      exact: true
    },
    {
      path: `${AppRoutes.bills}/:id`,
      component: BillPage
    },
    //  Reports
    {
      path: AppRoutes.reports,
      component: ReportPage,
      exact: true
    },
    // … rest
    {
      path: AppRoutes.catchAll,
      component: NotFoundPage
    }
  ];

  return (
    <Switch>
      {routes.map(({ exact, path, component: Component }) => (
        <Route key={path} exact={!!exact} path={path}>
          <Component />
        </Route>
      ))}
    </Switch>
  );
}
