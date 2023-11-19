import { last, omit } from 'lodash-es';
import { AppRouteProps, PublicRouteProps } from 'routes/types';
import useActiveRoutePaths from './useActiveRoutePaths';
import ROUTES from 'routes';

function getPublicRouteProps(route: AppRouteProps) {
  const publicProps: PublicRouteProps = omit(route, [
    'layoutProps',
    'element',
    'children',
  ]);

  return publicProps;
}

export default function useRouteProps(): PublicRouteProps {
  const activeRoutePaths = useActiveRoutePaths(ROUTES);
  const lastActiveRoutePath = last(activeRoutePaths);

  if (!lastActiveRoutePath) return {};

  const { definition, title } = lastActiveRoutePath;

  return {
    ...getPublicRouteProps(definition),
    title,
  };
}
