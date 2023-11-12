import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from 'pages/Error';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ROUTES from 'routes';
import renderRoutes from 'routes/renderRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(renderRoutes(ROUTES)),
);

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
