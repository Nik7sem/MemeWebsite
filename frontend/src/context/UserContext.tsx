import type {User} from "../types/user.ts";
import {createContext} from "react";

export function getDefaultUser(): User | null {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    return JSON.parse(storedUser) as User
  } else {
    return null
  }
}

interface UserSetter {
  user: User | null
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserSetter>({
  user: getDefaultUser(),
  setUser: () => {
  },
})