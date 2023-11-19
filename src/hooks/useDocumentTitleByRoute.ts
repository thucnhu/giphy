import { useEffect } from 'react';
import useRouteProps from './useRouteProps';

const DEFAULT_TITLE = 'Giphy';

export default function useDocumentTitleByRoute() {
  const routeProps = useRouteProps();

  useEffect(() => {
    const routeTitle = routeProps?.title;

    document.title =
      !routeTitle || typeof routeTitle !== 'string'
        ? DEFAULT_TITLE
        : [routeTitle, DEFAULT_TITLE].join(' - ');
  }, [routeProps]);
}
