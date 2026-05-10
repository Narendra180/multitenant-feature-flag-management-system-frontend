import type { LoggedInUser } from "@/types";
import { create } from "zustand";

type State = {
  loggedInUser: LoggedInUser | null;
}

type Action = {
  setLoggedInUser: (userObj: LoggedInUser) => void;
}

const useGlobalStore = create<State & Action>((set) => {
  return {
    loggedInUser: null,
    setLoggedInUser: (userObj) => {
      set(() => {
        return {
          loggedInUser: userObj
        }
      });
    }
  }
});

export {
  useGlobalStore
}
