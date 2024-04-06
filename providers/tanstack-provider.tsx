"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const TanstackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>
    {children}
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
);

export default TanstackProvider;
