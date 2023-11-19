import { useLocation } from 'react-router-dom';
import { defaultBreadcrumbData } from 'routes/constants';
import { mapDefinitionToActivePath } from 'routes/helpers';
import { AppRouteProps, ActiveRoutePath } from 'routes/types';

export function useMatchRoutePaths(
  routes: AppRouteProps[],
  pathname: string,
  data = defaultBreadcrumbData,
): ActiveRoutePath[] {
  const activeRoutePaths = mapDefinitionToActivePath(
    routes,
    pathname,
    data,
    '',
  );

  return activeRoutePaths;
}

export default function useActiveRoutePaths(
  routes: AppRouteProps[],
  data = defaultBreadcrumbData,
): ActiveRoutePath[] {
  const location = useLocation();

  return useMatchRoutePaths(routes, location.pathname, data);
}
