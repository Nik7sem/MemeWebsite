import {Navigate, Outlet} from "react-router-dom"
import useUser from "../hooks/useUser.tsx";

function RequireUser() {
  const {user} = useUser()

  if (user) {
    return <Outlet/>
  }

  return <Navigate to="/login" replace/>
}

export default RequireUser