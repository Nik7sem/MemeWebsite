import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";
import type {User} from "../types/user.ts";

const useUser = () => {
  const {user, setUser} = useContext(UserContext)

  function set(newUser: User) {
    setUser(newUser)
  }

  function remove() {
    setUser(null)
  }

  return {user, setUser: set, removeUser: remove}
}

export default useUser