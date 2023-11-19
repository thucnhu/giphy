import LoadingOverlay from 'components/LoadingOverlay';
import {
  ComponentType,
  Fragment,
  PropsWithChildren,
  ReactNode,
  Suspense,
} from 'react';
import { Outlet, Route } from 'react-router-dom';
import { AppRouteProps } from './types';
import ErrorPage from 'pages/Error';
import { omit } from 'lodash-es';
import { getRouteKey } from './helpers';
import useDocumentTitleByRoute from 'hooks/useDocumentTitleByRoute';
import { LayoutProps } from 'antd';
import AppLayout from 'layouts';
import RouteProtect from './RouteProtect';

const renderRoutes = (
  routes: AppRouteProps[],
  parentKey?: string,
): ReactNode[] =>
  routes.map((route) => {
    const { children, element: Element = Outlet, index, ...routeRest } = route;

    const isRootRoute = !parentKey;
    const routeKey = getRouteKey(route, parentKey) || '';

    const RouteElement = () => {
      useDocumentTitleByRoute();

      let Layout: ComponentType<PropsWithChildren<LayoutProps>> = Fragment;

      if (isRootRoute) {
        // Only apply layout and provider to root route
        Layout = AppLayout;
      }

      return (
        <RouteProtect>
          <Layout>
            <Suspense fallback={<LoadingOverlay />}>
              <Element />
            </Suspense>
          </Layout>
        </RouteProtect>
      );
    };

    if (index) {
      return (
        <Route
          {...omit(routeRest, 'path')}
          index
          element={<RouteElement />}
          errorElement={<ErrorPage />}
          key={[routeKey, 'index'].join('-')}
        />
      );
    }

    return (
      <Route
        {...routeRest}
        element={<RouteElement />}
        key={routeKey}
        errorElement={<ErrorPage />}
      >
        {children ? renderRoutes(children, routeKey) : undefined}
      </Route>
    );
  });

export default renderRoutes;
