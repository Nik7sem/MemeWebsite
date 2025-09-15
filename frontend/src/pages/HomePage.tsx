import React from 'react';
import {AspectRatio, Flex, VStack, Link} from "@chakra-ui/react";
import CanvasOnline from "../components/CanvasOnline.tsx";
import useUser from "../hooks/useUser.tsx";
import {useColorMode} from "../components/ui/color-mode.tsx";

const HomePage = () => {
  const {user} = useUser()
  const {colorMode} = useColorMode()

    return (
        <Flex
            width="100vw"
            height="100vh"
            justify="center"
            p="0"
            m="0"
        >
            <VStack width="100%" maxW="800px" px={4}>
                {user ? (
                    <CanvasOnline />
                ) : (
                    <AspectRatio width="100%" ratio={16 / 9}>
                        <iframe
                            style={{ borderRadius: '8px' }}
                            src="https://www.youtube-nocookie.com/embed/8V1eO0Ztuis?autoplay=1&rel=0&controls=0&showinfo=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </AspectRatio>
                )}

                <Link href="https://t.me/bipkilive">
                    <svg
                        fill={colorMode === 'dark' ? 'white' : 'black'}
                        width="100px"
                        height="100px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                    </svg>
                </Link>
            </VStack>
        </Flex>
    );
};

export default HomePage;