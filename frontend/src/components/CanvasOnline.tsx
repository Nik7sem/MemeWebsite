import React, {useEffect} from 'react';
import {Button, Container, Text} from "@chakra-ui/react";
import useWebSocket from "react-use-websocket";
import {wsUrl} from "../init.ts";

const CanvasOnline = () => {
  const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(wsUrl,
    {
      shouldReconnect: () => true,
      onOpen: () => {
        console.log("Websocket ready");
      },
    },
  )

  useEffect(() => {
    if (lastJsonMessage) {
      console.log(`Got a new message:`, lastJsonMessage)
    }
  }, [lastJsonMessage])

  return (
    <Container>
      <Text fontSize='5xl'>Home</Text>
      <Text>{readyState}</Text>
      <Button onClick={() => sendJsonMessage({data: 'hello'})}>Send</Button>
    </Container>
  );
};

export default CanvasOnline;