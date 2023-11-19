import { get, isEqual, omit } from 'lodash-es';
import {
  AppRouteProps,
  RawAppRouteProps,
  ActiveRoutePathTitleData,
  ActiveRoutePath,
  BreadcrumbDataType,
} from './types';
import { PathMatch, matchPath } from 'react-router-dom';
import { RouteEnumType } from './constants';

const joinOptionalPaths = (...paths: (string | undefined)[]): string =>
  paths.filter(Boolean).join('/').replaceAll(/\/\/+/g, '/');

const getRouteIndex = (routes: {
  index?: string | object;
}): string | undefined =>
  typeof routes.index === 'string' ? routes.index : undefined;

export function createBreadcrumbFilter(type: BreadcrumbDataType, id: string) {
  return [type, id].join('-');
}

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
  rawRoutes: RawAppRouteProps[],
  parentKey?: string,
): AppRouteProps[] {
  return rawRoutes.map((raw) => {
    const route: AppRouteProps = { ...raw };
    const routeKey = getRouteKey(raw, parentKey)!;

    route.path = get(routeEnum, routeKey);
    route.fullPath = get(routePaths, routeKey);

    if (Array.isArray(raw.children)) {
      route.children = configRoutes(
        routeEnum,
        routePaths,
        raw.children,
        routeKey,
      );
    }

    return route as AppRouteProps;
  });
}

// use matchPath to resolve params on the path: https://github.com/remix-run/react-router/issues/5870#issuecomment-394194338
function matchPatternInPath(
  pathPattern: string,
  locationPathname: string,
  requireExactMatch: boolean = false,
): PathMatch<string> | null {
  return matchPath(
    {
      path: pathPattern,
      end: requireExactMatch,
    },
    locationPathname,
  );
}

// https://github.com/remix-run/react-router/blob/f16c5490dfa75f15dcfb86d2a981a7c58a9d1a33/packages/react-router/index.tsx#L1369
const joinPaths = (paths: string[]): string =>
  paths.join('/').replaceAll(/\/\/+/g, '/');

export function concatPaths(parent: string, current: string) {
  const jointPaths = joinPaths([parent, current]);

  return jointPaths;
}

function isResolvedAsActive(
  toPathname: string,
  locationPathname: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  definition: AppRouteProps,
) {
  return isPathActiveForLocation(toPathname, locationPathname);
}

// isActive logic from NavLink: https://github.com/remix-run/react-router/blob/7668662895337af01f0a8eb22788e0e6b2f5e344/packages/react-router-dom/index.tsx#L324
function isPathActiveForLocation(pathName: string, locationPathname: string) {
  return (
    locationPathname === pathName ||
    (locationPathname.startsWith(pathName) &&
      locationPathname.charAt(pathName.length) === '/')
  );
}

function isNotSameAsPreviousMatch(
  previousMatches: ActiveRoutePath[],
  match: PathMatch<string>,
): boolean {
  const previousMatchedPathname =
    getPreviousMatch(previousMatches)?.match.pattern ?? '';

  return !isEqual(previousMatchedPathname, match.pattern);
}

function isMoreSpecificThanPreviousMatch(
  previousMatches: ActiveRoutePath[],
  toPathname: string,
): boolean {
  const previousMatchedPathname =
    getPreviousMatch(previousMatches)?.match.pathname ?? '';

  return toPathname.length > previousMatchedPathname.length;
}

function getPreviousMatch(
  previousMatches: ActiveRoutePath[],
): ActiveRoutePath | undefined {
  return previousMatches.at(-1);
}

function canBeAddedToActiveRoutes(
  activeRoutePaths: ActiveRoutePath[],
  match: PathMatch<string>,
) {
  return (
    isNotSameAsPreviousMatch(activeRoutePaths, match) &&
    isMoreSpecificThanPreviousMatch(activeRoutePaths, match.pathname)
  );
}

function addActiveRoutePathIfPossible(
  activeRoutePaths: ActiveRoutePath[],
  activePath: ActiveRoutePath,
) {
  if (canBeAddedToActiveRoutes(activeRoutePaths, activePath.match)) {
    activeRoutePaths.push(activePath);
  }
}

export function mapDefinitionToActivePath(
  definitions: AppRouteProps[],
  locationPathname: string,
  data: ActiveRoutePathTitleData,
  parentPath: string = '',
): ActiveRoutePath[] {
  const activeRoutePaths: ActiveRoutePath[] = [];

  for (const [, definition] of definitions.entries()) {
    if (!definition.path) continue;

    const pathPatternWithParent = definition.index
      ? parentPath
      : concatPaths(parentPath, definition.path);
    // const pathPatternWithParent = concatPaths(parentPath, definition.path);

    const match = matchPatternInPath(pathPatternWithParent, locationPathname);

    if (!match) {
      continue;
    }

    if (isResolvedAsActive(match.pathname, locationPathname, definition)) {
      const activeRoutePath: ActiveRoutePath = {
        definition,
        title:
          typeof definition.title === 'function'
            ? definition.title({
                definition,
                match,
                locationPathname,
                data,
              })
            : definition.title,
        match,
      };

      addActiveRoutePathIfPossible(activeRoutePaths, activeRoutePath);

      if (definition.children) {
        const nestedMatches = mapDefinitionToActivePath(
          definition.children,
          locationPathname,
          data,
          pathPatternWithParent,
        );

        for (const activePath of nestedMatches) {
          addActiveRoutePathIfPossible(activeRoutePaths, activePath);

          if (
            activePath.definition.index &&
            !isNotSameAsPreviousMatch(activeRoutePaths, activePath.match)
          ) {
            const exactMatch = matchPatternInPath(
              pathPatternWithParent,
              locationPathname,
              true,
            );

            if (exactMatch) {
              // Merge index route props when exact match
              const lastActiveRoutePath = activeRoutePaths.at(-1)!;

              activeRoutePaths[activeRoutePaths.length - 1] = {
                ...lastActiveRoutePath,
                title: activePath.title ?? lastActiveRoutePath.title,
                definition: {
                  ...lastActiveRoutePath.definition,
                  ...omit(activePath.definition, [
                    'index',
                    'element',
                    'children',
                  ]),
                },
              };
            }
          }
        }
      }
    }
  }

  return activeRoutePaths;
}
