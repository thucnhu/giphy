/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { AppRouteProps, RouteEnum, RoutePaths } from './types';
import { configRoutes } from './helpers';

const HomePage = lazy(() => import('pages/Home'));
const SearchResultsPage = lazy(() => import('pages/SearchResults'));

const ROUTES: AppRouteProps[] = [
  {
    key: 'Home.index',
    element: HomePage,
  },
  {
    key: 'Home.search.container',
    element: SearchResultsPage,
  },
];

export default configRoutes(RouteEnum, RoutePaths, ROUTES);
