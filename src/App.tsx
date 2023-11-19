import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from 'pages/Error';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ROUTES from 'routes';
import renderRoutes from 'routes/renderRoutes';
import { QueryClientProvider } from 'providers/QueryClientProvider';

const router = createBrowserRouter(
  createRoutesFromElements(renderRoutes(ROUTES)),
);

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <QueryClientProvider>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
