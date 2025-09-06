import type {User} from "../types/user.ts";
import {createContext} from "react";

interface UserSetter {
  user: User | null
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserSetter>({
  user: null,
  setUser: () => {
  },
})