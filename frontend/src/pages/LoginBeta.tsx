import React, {useState, type KeyboardEvent} from 'react';
import {
    Input,
    Button,
    Box,
    Flex,
    Text,
    Field,
    Fieldset,
    Span, Stack,
} from '@chakra-ui/react'
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

    function keyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onClick().then()
        }
    }

    async function onClick() {
        if (!validate()) return

        const rs = await login(username, password);
        if (rs.data) {
            setUser({...rs.data});
        } else if (rs.error) {
            setError(rs.error)
        }
    }

    return (
        <Flex
            as="main"
            pos="fixed"
            inset="0"
            w="100vw"
            h="100vh"
            maxW="100vw"
            overflow="hidden"
            flexDirection={{ base: 'column', md: 'row' }} // вертикально на мобилках
        >
            {/* Левая часть - изображение. Скрыта на маленьких экранах */}
            <Box
                flex="1"
                minW="0"
                bgImage="url('/Suitcase1.jpg')"
                bgSize="cover"
                bgPos="center"
                display={{ base: 'none', md: 'block' }}
            />

            <Text
                position="absolute"
                bottom="10px"
                left="10px"
                fontSize="xs"
                color="whiteAlpha.700"
                p="1"
                borderRadius="sm"
                display={{ base: 'none', md: 'block' }}
            >
                BIPKI AI Suitcase data transfer technology
            </Text>

            {/* Правая часть - форма */}
            <Box
                flex="1"
                bg="transparent"
                p={{ base: '6', md: '12' }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                w="100%"
            >

                <Fieldset.Root invalid={!!error}>

                    <Stack>
                        <Fieldset.Legend  mb="0" fontWeight="bold" fontSize="2xl">BiPKI Services</Fieldset.Legend>
                        <Fieldset.HelperText fontSize="m">
                            Nice to see you again!
                        </Fieldset.HelperText>
                    </Stack>

                    <Stack>
                        <Fieldset.Legend mb={"0"}>Login</Fieldset.Legend>
                    </Stack>

                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Username</Field.Label>
                            <Input placeholder = 'Username' name="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <Input name="password" type="password" onChange={(e) => setPassword(e.target.value)}
                                   placeholder = 'Password'
                                   onKeyDown={keyDownHandler}/>
                        </Field.Root>
                    </Fieldset.Content>

                    <Flex justify="space-between" align="center" width="100%" p="4">
                        <Fieldset.HelperText>
                            Not registered? You can register <Span color='blue.400'><Link to='/register'>here</Link></Span>.
                        </Fieldset.HelperText>

                        <Button type="submit" alignSelf="flex-start" onClick={() => onClick()}>
                            Log in
                        </Button>
                    </Flex>

                    <Fieldset.ErrorText>
                        {error}
                    </Fieldset.ErrorText>
                </Fieldset.Root>

                <Text fontSize="xs" color="gray.500" textAlign="center" mt="auto">
                    © BIPKI Services 2025
                </Text>
            </Box>
        </Flex>
    )
}

export default Login;