import LoadingOverlay from 'components/LoadingOverlay';
import { ReactNode, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { AppRouteProps } from './types';
import ErrorPage from 'pages/Error';
import { omit } from 'lodash-es';

const renderRoutes = (
  routes: AppRouteProps[],
  parentKey?: string,
): ReactNode[] =>
  routes.map((route) => {
    const { children, element: Element, index, ...routeRest } = route;
    const routeKey = index ? parentKey : route.key;

    const RouteElement = (
      <Suspense fallback={<LoadingOverlay />}>
        <Element />
      </Suspense>
    );

    if (index) {
      return (
        <Route
          {...omit(routeRest, 'path')}
          index
          element={RouteElement}
          errorElement={<ErrorPage />}
          key={[routeKey, 'index'].join('-')}
        />
      );
    }

    return (
      <Route
        {...routeRest}
        element={RouteElement}
        key={routeKey}
        errorElement={<ErrorPage />}
      >
        {children ? renderRoutes(children, routeKey) : undefined}
      </Route>
    );
  });

export default renderRoutes;
