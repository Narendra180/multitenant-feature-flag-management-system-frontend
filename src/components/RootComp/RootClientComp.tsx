"use client";

import GlobalStoreProvider from "@/store/globalStore/GlobalStoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { WrapperComp } from "./WrapperComp";

type Props = {
  children?: ReactNode;
}

const queryClient = new QueryClient();

const RootClientComp = ({
  children
}: Props) => {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      <GlobalStoreProvider>
        <WrapperComp>
          {children}
        </WrapperComp>
      </GlobalStoreProvider>
      <Toaster />
    </QueryClientProvider>
  )
}

export {
  RootClientComp
}
