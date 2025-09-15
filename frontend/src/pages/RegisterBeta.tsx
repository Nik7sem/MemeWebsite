import React, {type KeyboardEvent, useState} from 'react';
import {
    Input,
    InputGroup,
    Button,
    Box,
    Flex,
    Heading,
    Text,
    Field,
    Fieldset,
    Span, Stack,
} from '@chakra-ui/react'
import useUser from "../hooks/useUser.tsx";
import {register} from "../api/auth.ts";
import {Link} from "react-router";

const Register = () => {
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

        const rs = await register(username, password);
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
            inset="0"        // top:0; right:0; bottom:0; left:0
            w="100vw"
            h="100vh"
            maxW="100vw"
            overflow="hidden"
        >
            <Box flex="1" minW="0" bgImage="url('/Suitcase1.jpg')" bgSize="cover" bgPos="center" />

            {/* Левая часть - картинка */}
            <Box
                backgroundImage="url('/Suitcase1.jpg')"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                position="relative"
            >

            </Box>

            <Text
                position="absolute"
                bottom="10px"
                left="10px"
                fontSize="xs"
                color="whiteAlpha.700"
                p="1"
                borderRadius="sm"
            >
                BIPKI AI Suitcase data transfer technology
            </Text>

            {/* Правая часть - форма */}
            <Box
                flex="1"
                bg="black"
                p="12"
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <Box mb="6" fontWeight="bold" fontSize="lg" letterSpacing="wide" color="whiteAlpha.950">
                    BIPKI Services
                </Box>
                <Heading size="md" mb="8" color="whiteAlpha.800">
                    Nice to see you again
                </Heading>

                <Fieldset.Root invalid={!!error}>
                    <Stack>
                        <Fieldset.Legend>Register</Fieldset.Legend>
                    </Stack>

                    <Fieldset.Content>
                        <Field.Root>
                            <Field.Label>Username</Field.Label>
                            <Input name="username" type="text" onChange={(e) => setUsername(e.target.value)}/>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>Password</Field.Label>
                            <Input name="password" type="password" onChange={(e) => setPassword(e.target.value)}
                                   onKeyDown={keyDownHandler}/>
                        </Field.Root>
                    </Fieldset.Content>

                    <Flex justify="space-between" align="center" width="100%" p="4">
                        <Fieldset.HelperText>
                            Already registered? You can login <Span color='blue.400'><Link to='/login'>here</Link></Span>.
                        </Fieldset.HelperText>

                        <Button type="submit" alignSelf="flex-start" onClick={() => onClick()}>
                            Submit
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

export default Register;