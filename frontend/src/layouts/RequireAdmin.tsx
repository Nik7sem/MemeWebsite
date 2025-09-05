import {Navigate, Outlet} from "react-router-dom"
import useUser from "../hooks/useUser.tsx";

function RequireAdmin() {
  const {user} = useUser()

  if (user && user.role === "admin") {
    return <Outlet/>
  }

  return <Navigate to="/" replace/>
}

export default RequireAdmin