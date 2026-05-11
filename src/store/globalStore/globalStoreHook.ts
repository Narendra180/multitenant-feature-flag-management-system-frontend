import { useContext } from "react";
import { GlobalStoreContext } from "./GlobalStoreContext";
import { GlobalStore } from "./store";
import { useStore } from "zustand";

const useGlobalStore = <T,>(
  selector: (store: GlobalStore) => T,
): T => {
  const globalStoreContext = useContext(GlobalStoreContext);
  if (!globalStoreContext) {
    throw new Error(`useGlobalStore must be used within GlobalStoreProvider`)
  }

  return useStore(globalStoreContext, selector)
}

export {
  useGlobalStore
}
