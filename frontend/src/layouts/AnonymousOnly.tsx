import {Outlet, Navigate} from "react-router-dom"
import useUser from "../hooks/useUser.tsx";

function AnonymousOnly() {
  const {user} = useUser()

  if (!user) {
    return <Outlet/>
  }

  return <Navigate to="/profile" replace/>
}


export default AnonymousOnly;