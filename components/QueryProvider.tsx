import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create query client
const queryClient = new QueryClient();

export default function QueryProvider({ children }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
