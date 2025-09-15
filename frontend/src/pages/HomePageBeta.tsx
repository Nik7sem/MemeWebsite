import React from 'react';
import {AspectRatio, Container, VStack, Link, Button, Box, Flex, Stack, Image, Text} from "@chakra-ui/react";
import CanvasOnline from "../components/CanvasOnline.tsx";
import useUser from "../hooks/useUser.tsx";
import {useColorMode} from "../components/ui/color-mode.tsx";

const HomePageBeta = () => {
  const {user} = useUser()
  const {colorMode} = useColorMode()

  return (
    <Container width="100%" p='0' m='0'>
      <VStack width="100%" p='0' m='0'>
        {
          user
            ?
            <CanvasOnline/>
            :

            <AspectRatio width="100%" ratio={16 / 9}>
              <iframe
                style={{margin: 'auto'}}
                width="100%" height="auto"
                src="https://www.youtube-nocookie.com/embed/8V1eO0Ztuis?autoplay=1&rel=0&controls=0&showinfo=0"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
              </iframe>
            </AspectRatio>
        }

          <Button type="submit" alignSelf="flex-start"  >
              Creampie
          </Button>

          <Box position="relative" height="500px" width="100%">
              {/* Картинка */}
              <Image
                  src="/images/background.jpg" // путь к твоей картинке
                  alt="Background"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  borderRadius="xl"
              />

              {/* Контент поверх картинки */}
              <Flex
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                  bg="rgba(0, 0, 0, 0.4)" // полупрозрачный фон
                  color="white"
                  textAlign="center"
                  p={4}
              >
                  <Stack spacing={4}>
                      <Text fontSize="3xl" fontWeight="bold">
                          Добро пожаловать!
                      </Text>
                      <Text fontSize="lg">Войдите в аккаунт или зарегистрируйтесь</Text>
                      <Stack direction="row" spacing={4} justify="center">
                          <Button colorScheme="teal" variant="solid">
                              Войти
                          </Button>
                          <Button colorScheme="blue" variant="outline">
                              Регистрация
                          </Button>
                      </Stack>
                  </Stack>
              </Flex>
          </Box>

        <Link href='https://t.me/bipkilive'>
          <svg fill={colorMode === 'dark' ? 'white' : 'black'} width="100px" height="100px" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
          </svg>
        </Link>
      </VStack>
    </Container>
  );
};

export default HomePageBeta;