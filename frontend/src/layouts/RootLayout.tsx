import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";
import {profile} from "../api/auth.ts";
import useUser from "../hooks/useUser.tsx";
import Loader from "../components/Loader.tsx";
import Footer from "../components/Footer.tsx";
import {Flex} from "@chakra-ui/react";

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
    <Flex flexDirection='column' width='100%' minHeight='100vh' m='0' p='0' alignItems='center'>
      <Header/>
      {
        loading ? <Loader/> : <Outlet/>
      }
      <Footer/>
    </Flex>
  );
};

export default RootLayout;