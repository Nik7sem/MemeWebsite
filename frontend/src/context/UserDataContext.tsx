import {createContext} from "react";
import type {UserData} from "../types/user.ts";

const defaultUserData: UserData = {
  token: ''
}

export function getDefaultUserData(): UserData {
  const storedUserData = localStorage.getItem('userdata')
  if (storedUserData) {
    return {...defaultUserData, ...(JSON.parse(storedUserData) as UserData)}
  } else {
    return defaultUserData
  }
}

interface UserDataSetter {
  userData: UserData
  setUserData: (userData: UserData) => void;
}

export const UserDataContext = createContext<UserDataSetter>({
  userData: getDefaultUserData(),
  setUserData: () => {
  },
})