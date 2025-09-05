import React from 'react';
import {Button, Container, Text} from "@chakra-ui/react";
import {login, logout, profile, register} from "../api/auth.ts";

const Register = () => {
  return (
    <Container>
      <Text fontSize='5xl'>Register</Text>
      <Button onClick={() => register('siegfried', '1111').then(data => console.log(data))}>Register</Button>
      <Button onClick={() => login('siegfried', '1111').then(data => console.log(data))}>Login</Button>
      <Button onClick={() => logout().then(data => console.log(data))}>Logout</Button>
      <Button onClick={() => profile().then(data => console.log(data))}>Profile</Button>
    </Container>
  )
}

export default Register;