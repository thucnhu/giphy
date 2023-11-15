import { NestedPaths } from 'lib/NestedPaths';
import React from 'react';
import { RouteProps } from 'react-router-dom';
import { makeRoutePaths } from './helpers';

export const RouteEnum = {
  Home: {
    index: '/',
    search: {
      index: 'search',
      gifs: 'gifs',
      stickers: 'stickers',
      container: ':type',
    },
    gifs: {
      index: ':id',
    },
    stickers: {
      index: ':id',
    },
  },
  PageNotFound: '*',
};

export type RouteEnumType = typeof RouteEnum;

export type RouteKey = NestedPaths<RouteEnumType>;

export type IndexRouteOrWithKey =
  | {
      /** Must be a key of { @see RoutePaths } */
      key: RouteKey;
    }
  | {
      index: true;
    };

export type AppRouteProps = Omit<RouteProps, 'children' | 'element'> &
  IndexRouteOrWithKey & {
    element: React.ComponentType;
    children?: AppRouteProps[];
    fullPath?: string;
  };

export const RoutePaths = makeRoutePaths(RouteEnum) as unknown as RouteEnumType;
