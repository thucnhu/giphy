/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { RawAppRouteProps, RoutePaths } from './types';
import { configRoutes, createBreadcrumbFilter } from './helpers';
import { RouteEnum } from './constants';

const HomePage = lazy(() => import('pages/Home'));
const SearchResultsPage = lazy(() => import('pages/Search/Container'));
const MediaInfoPage = lazy(() => import('pages/Info'));

const ROUTES: RawAppRouteProps[] = [
  {
    key: 'Home.index',
    element: HomePage,
  },
  {
    key: 'Home.search.index',
    children: [
      {
        index: true,
      },
      {
        key: 'Home.search.containers',
        element: SearchResultsPage,
        title: ({ data, match }) => {
          const defaultTitle = 'Search results';

          if (!match.params.keyword) {
            return defaultTitle;
          }
          return (
            data.byId[
              createBreadcrumbFilter('search', match.params.keyword!)
            ] ?? defaultTitle
          );
        },
      },
    ],
  },
  {
    key: 'Home.mediaInfo',
    element: MediaInfoPage,
  },
];

export default configRoutes(RouteEnum, RoutePaths, ROUTES);
