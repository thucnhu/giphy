import React from 'react';
import { RouteProps } from 'react-router-dom';

export type AppRouteProps = Omit<RouteProps, 'children' | 'element'> & {
  element: React.ComponentType;
  children?: AppRouteProps[];
  title?: string;
};

export const RouteEnum = {
  Home: '/',
  Search: 'search/:query',
  Gifs: '/:id',
};
