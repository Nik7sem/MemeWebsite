import React from 'react';
import {AspectRatio, Container} from "@chakra-ui/react";
import CanvasOnline from "../components/CanvasOnline.tsx";
import useUser from "../hooks/useUser.tsx";

const HomePage = () => {
  const {user} = useUser()

  return (
    <Container width="100%">
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
    </Container>
  );
};

export default HomePage;