import { ActiveRoutePathTitleData } from './types';

export const RouteEnum = {
  Home: {
    index: '/',
    search: {
      index: 'search',
      gifs: 'gifs/:keyword',
      stickers: 'stickers/:keyword',
      containers: ':type/:keyword',
    },
    gifs: 'gifs/:id',
    stickers: 'stickers/:id',
    mediaInfo: ':type/:id',
  },
  PageNotFound: '*',
};

export type RouteEnumType = typeof RouteEnum;

export const defaultBreadcrumbData: ActiveRoutePathTitleData = { byId: {} };
