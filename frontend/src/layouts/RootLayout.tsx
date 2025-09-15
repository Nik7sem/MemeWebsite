import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";
import {profile} from "../api/auth.ts";
import useUser from "../hooks/useUser.tsx";
import Loader from "../components/Loader.tsx";
import Footer from "../components/Footer.tsx";
import {Flex} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";

const RootLayout = () => {
  const {setUser} = useUser()
  const [loading, setLoading] = useState<boolean>(true)
    const location = useLocation();
    const hideHeaderFooter = ["/login", "/register"].includes(location.pathname);

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
        {!hideHeaderFooter && <Header />}

        <main style={{ width: '100%', flex: 1 }}>
            <Outlet />
        </main>

        {!hideHeaderFooter && <Footer />}
    </Flex>
  );
};

export default RootLayout;