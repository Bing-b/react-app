// hooks/useBreadcrumb.ts
import { matchRoutes, useLocation } from 'react-router-dom';
import { mainRoutes } from '../routes';

export function useBreadcrumb() {
  const location = useLocation();
  const matches = matchRoutes(mainRoutes, location);

  if (!matches) return [];

  return matches
    .filter((match) => match.route.label)
    .map((match) => ({
      title: match.route.label,
      path: match.pathname,
    }));
}
