import React from 'react';
import {Button, Container, Text} from "@chakra-ui/react";
import {logout} from "../api/auth.ts";
import useUser from "../hooks/useUser.tsx";
import {redirect} from "react-router-dom";

const Profile = () => {
  const {removeUser} = useUser()

  async function onClick() {
    logout().finally(() => {
      removeUser()
      redirect('/login')
    })
  }

  return (
    <Container>
      <Text>Profile</Text>
      <Button onClick={() => onClick()}>Logout</Button>
    </Container>
  );
};

export default Profile;