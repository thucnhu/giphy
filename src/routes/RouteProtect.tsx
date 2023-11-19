import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePaths } from './types';

export default function RouteProtect({ children }: PropsWithChildren) {
  const { pathname, search } = useLocation();
  const nonIndexRoutes = ['/search', '/stickers', '/gifs'];

  if (pathname.match('/.*/$')) {
    return (
      <Navigate
        replace
        to={{
          pathname: pathname.replace(/\/+$/, ''),
          search,
        }}
      />
    );
  }

  if (nonIndexRoutes.includes(pathname)) {
    return <Navigate replace to={RoutePaths.Home.index} />;
  }

  return <>{children}</>;
}
