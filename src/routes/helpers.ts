import { get } from 'lodash-es';
import { RouteEnumType, AppRouteProps } from './types';

const joinOptionalPaths = (...paths: (string | undefined)[]): string =>
  paths.filter(Boolean).join('/').replaceAll(/\/\/+/g, '/');

const getRouteIndex = (routes: {
  index?: string | object;
}): string | undefined =>
  typeof routes.index === 'string' ? routes.index : undefined;

export const makeRoutePaths = (
  routes: Record<string, string | object>,
  parentPath?: string,
) => {
  try {
    const routePaths: Record<string, string | object> = {};

    const basePath: string | undefined = getRouteIndex(routes);

    for (const [key, value] of Object.entries(routes)) {
      if (typeof value === 'string') {
        routePaths[key] = joinOptionalPaths(
          parentPath,
          key === 'index' ? '' : basePath,
          value,
        );
      } else if (typeof value === 'object') {
        routePaths[key] = makeRoutePaths(
          value as Record<string, string | object>,
          getRouteIndex(routePaths),
        );
      }
    }

    return routePaths;
  } catch {
    return {};
  }
};

export const getRouteKey = (route: AppRouteProps, parentKey?: string) =>
  (route.index ? parentKey : route.key) as string;

export function configRoutes(
  routeEnum: RouteEnumType,
  routePaths: RouteEnumType,
  rawRoutes: AppRouteProps[],
  parentKey?: string,
): AppRouteProps[] {
  return rawRoutes.map((raw) => {
    const routeKey = getRouteKey(raw, parentKey)!;

    raw.path = get(routeEnum, routeKey);
    raw.fullPath = get(routePaths, routeKey);

    if (Array.isArray(raw.children)) {
      raw.children = configRoutes(
        routeEnum,
        routePaths,
        raw.children,
        routeKey,
      );
    }

    return raw as AppRouteProps;
  });
}
