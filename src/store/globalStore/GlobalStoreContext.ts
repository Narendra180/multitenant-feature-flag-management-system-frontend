import { createContext } from "react"
import { createGlobalStore } from "./store"

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
  undefined,
);

