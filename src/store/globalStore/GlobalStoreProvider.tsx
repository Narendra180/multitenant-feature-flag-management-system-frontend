import { ReactNode, useState } from "react";
import { createGlobalStore } from "./store";
import { GlobalStoreContext } from "./GlobalStoreContext";

export type GlobalStoreProviderProps = {
  children: ReactNode
}

const GlobalStoreProvider = ({
  children
}: GlobalStoreProviderProps) => {
  const [store] = useState(() => createGlobalStore());
  return (
    <GlobalStoreContext
      value={store}
    >
      {children}
    </GlobalStoreContext>
  )
}

export default GlobalStoreProvider;
