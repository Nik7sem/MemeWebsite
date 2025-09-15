import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import HomePageBeta from "./pages/HomePageBeta.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {useState} from "react";
import type {User, UserData} from "./types/user.ts";
import {getDefaultUserData, UserDataContext} from "./context/UserDataContext.tsx";
import Register from "./pages/RegisterBeta.tsx";
import {UserContext} from "./context/UserContext.tsx";
import AnonymousOnly from "./layouts/AnonymousOnly.tsx";
import RequireUser from "./layouts/RequireAuth.tsx";
import Profile from "./pages/Profile.tsx";
import RequireAdmin from "./layouts/RequireAdmin.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import Login from "./pages/LoginBeta.tsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<HomePageBeta/>}/>
    <Route element={<AnonymousOnly/>}>
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
    </Route>

    <Route element={<RequireUser/>}>
      <Route path="profile" element={<Profile/>}/>
    </Route>

    <Route element={<RequireAdmin/>}>
      <Route path="admin" element={<AdminPage/>}/>
    </Route>

    <Route path="*" element={<NotFoundPage/>}/>
  </Route>
))

function App() {
  const [userData, setUserData] = useState<UserData>(getDefaultUserData)
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserDataContext.Provider value={{userData, setUserData}}>
      <UserContext value={{user, setUser}}>
        <RouterProvider router={router}/>
      </UserContext>
    </UserDataContext.Provider>
  )
}

export default App
