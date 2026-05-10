"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";

type Props = {
  children?: ReactNode;
}

const queryClient = new QueryClient();

const RootClientComponent = ({
  children
}: Props) => {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      {children}
      <Toaster />
    </QueryClientProvider>
  )
}

export {
  RootClientComponent
}
