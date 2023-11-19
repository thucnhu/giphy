import { NestedPaths } from 'lib/NestedPaths';
import React from 'react';
import { PathMatch, RouteProps as RRRouteProps } from 'react-router-dom';
import { makeRoutePaths } from './helpers';
import { RouteEnumType, RouteEnum } from './constants';
import { LiteralUnion } from 'antd/es/_util/type';
import { MediaType } from '@giphy/js-fetch-api';

export type RouteKey = NestedPaths<RouteEnumType>;

export type IndexRouteOrWithKey =
  | {
      /** Must be a key of { @see RoutePaths } */
      key: RouteKey;
    }
  | {
      index: true;
    };

export interface ActiveRoutePathTitleData {
  byId: Record<string, string>;
}

export type ActiveRoutePathTitleCallbackParams<
  ParamKey extends string = string,
> = {
  definition: AppRouteProps;
  match: PathMatch<ParamKey>;
  locationPathname: string;
  data: ActiveRoutePathTitleData;
};

export type ActiveRoutePathTitleCallback = (
  params: ActiveRoutePathTitleCallbackParams,
) => string;

export type RawAppRouteProps = Omit<
  RRRouteProps,
  'children' | 'element' | 'path'
> &
  IndexRouteOrWithKey & {
    children?: RawAppRouteProps[];
    element?: React.ComponentType; // optional, default to Outlet
    title?: string | ActiveRoutePathTitleCallback;
    // other props may be added as the app grows
  };

export type AppRouteProps = RawAppRouteProps & {
  path?: string;
  fullPath?: string;
  children?: AppRouteProps[];
};

export interface ActiveRoutePath {
  title?: string;
  match: PathMatch<string>;
  definition: AppRouteProps;
}

export interface PublicRouteProps
  extends Omit<AppRouteProps, 'element' | 'children'> {}

export const RoutePaths = makeRoutePaths(RouteEnum) as unknown as RouteEnumType;

export type BreadcrumbDataType = LiteralUnion<MediaType | 'search' | string>;
