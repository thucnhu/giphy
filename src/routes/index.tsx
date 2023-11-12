import { lazy } from 'react';
import { AppRouteProps, RouteEnum } from './types';

const HomePage = lazy(() => import('pages/Home'));

const ROUTES: AppRouteProps[] = [
  {
    path: RouteEnum.Home,
    element: HomePage,
  },
];

export default ROUTES;
