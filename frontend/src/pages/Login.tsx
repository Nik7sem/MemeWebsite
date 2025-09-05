import React, {useState} from 'react';
import {Button, Field, Fieldset, Flex, Input, Span, Stack} from "@chakra-ui/react";
import {Link} from "react-router";
import {login} from "../api/auth.ts";
import useUser from "../hooks/useUser.tsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setUser} = useUser();

  function validate(): boolean {
    if (!username) {
      setError("Username is required");
    } else if (!password) {
      setError("Password is required");
    } else {
      return true
    }
    return false
  }

  async function onClick() {
    if (!validate()) return

    const rs = await login(username, password);
    if (rs.data) {
      setUser({...rs.data, username});
    } else if (rs.error) {
      setError(rs.error)
    }
  }

  return (
    <Flex width='full' height='70vh' justifyContent='center' alignItems='center'>
      <Fieldset.Root size="lg" maxW="md" border='solid 1px #27272a' borderRadius='2xl' p='40px' invalid={!!error}>
        <Stack>
          <Fieldset.Legend>Login</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your credentials below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input name="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
          </Field.Root>
        </Fieldset.Content>

        <Fieldset.HelperText>
          Not registered? You can register <Span color='blue.400'><Link to='/register'>here</Link></Span>.
        </Fieldset.HelperText>

        <Button type="submit" alignSelf="flex-start" onClick={() => onClick()}>
          Submit
        </Button>

        <Fieldset.ErrorText>
          {error}
        </Fieldset.ErrorText>
      </Fieldset.Root>
    </Flex>
  );
};

export default Login;