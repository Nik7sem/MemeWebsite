import React from 'react';
import {Container, Text} from "@chakra-ui/react";
import CanvasOnline from "../components/CanvasOnline.tsx";
import useUser from "../hooks/useUser.tsx";

const HomePage = () => {
  const {user} = useUser()

  return (
    <Container p='10px' m='10px'>
      {
        user ? <CanvasOnline/> : <Text mx="40px" fontSize='7xl'>Home page</Text>
      }
    </Container>
  );
};

export default HomePage;