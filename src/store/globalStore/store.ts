import type { LoggedInUser } from "@/types";
import { create, createStore } from "zustand";

type State = {
  loggedInUser: LoggedInUser | null;
}

type Action = {
  setLoggedInUser: (userObj: LoggedInUser) => void;
}

export type GlobalStore = State & Action;

export const defaultInitState: State = {
  loggedInUser: null
}

export const createGlobalStore = (
  initState: State = defaultInitState,
) => {
  return createStore<GlobalStore>()((set) => {
    return {
      ...initState,
      setLoggedInUser: (userObj) => {
        set(() => {
          return {
            loggedInUser: userObj
          }
        });
      }
    }
  });
}



