import {
  QueryClient,
  QueryClientProvider as RQQueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <RQQueryClientProvider client={queryClient}>{children}</RQQueryClientProvider>
);
