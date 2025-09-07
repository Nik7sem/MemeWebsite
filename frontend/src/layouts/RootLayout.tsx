import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";
import VersionText from "../components/VersionText.tsx";
import {profile} from "../api/auth.ts";
import useUser from "../hooks/useUser.tsx";
import Loader from "../components/Loader.tsx";

const RootLayout = () => {
  const {setUser} = useUser()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (loading) {
      profile().then((rs) => {
        setTimeout(() => {
          if (rs.data) {
            setUser({...rs.data})
          }
          setLoading(false)
        }, 500)
      })
    }
  }, [setUser, loading])

  return (
    <>
      <Header/>
      <VersionText/>
      {
        loading ? <Loader/> : <Outlet/>
      }
    </>
  );
};

export default RootLayout;