import LoadingOverlay from 'components/LoadingOverlay';
import { ReactNode, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { AppRouteProps } from './types';
import ErrorPage from 'pages/Error';

const renderRoutes = (routes: AppRouteProps[]): ReactNode[] =>
  routes.map((route) => {
    const { children, element: Element, path } = route;

    const RouteElement = (
      <Suspense fallback={<LoadingOverlay />}>
        <Element />
      </Suspense>
    );

    if (children) {
      return (
        <Route
          key={path}
          path={path}
          element={RouteElement}
          errorElement={<ErrorPage />}
        >
          {renderRoutes(children)}
        </Route>
      );
    }

    return (
      <Route
        key={path}
        path={path}
        element={RouteElement}
        errorElement={<ErrorPage />}
      />
    );
  });

export default renderRoutes;
