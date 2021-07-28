import { Route, Switch } from 'react-router-dom';
import BillPage from './pages/bill';
import BillsPage from './pages/bills';
import HomePage from './pages/home';
import NewBillPage from './pages/newBill';
import NotFoundPage from './pages/notFound';

type RouteConfig = {
  path: string;
  component: ({ ...props }: any) => JSX.Element;
  exact?: boolean;
};

export default function Router() {
  const routes: RouteConfig[] = [
    {
      path: '/',
      component: HomePage,
      exact: true
    },
    {
      path: '/bills/new',
      component: NewBillPage,
      exact: true
    },
    {
      path: '/bills',
      component: BillsPage,
      exact: true
    },
    {
      path: '/bills/:id',
      component: BillPage
    },
    {
      path: '*',
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
