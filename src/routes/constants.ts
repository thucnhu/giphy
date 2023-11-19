import { ActiveRoutePathTitleData } from './types';

export const RouteEnum = {
  Home: {
    index: '/',
    search: {
      index: 'search',
      gifs: 'gifs',
      stickers: 'stickers',
      containers: ':type/:keyword',
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

export const defaultBreadcrumbData: ActiveRoutePathTitleData = { byId: {} };
