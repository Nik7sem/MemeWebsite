import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Badge, type Color, ColorPicker, Container, Flex, HStack, parseColor, Portal, VStack} from "@chakra-ui/react";
import useWebSocket from "react-use-websocket";
import {wsUrl} from "../init.ts";
import {DrawingCanvas} from "../utils/DrawingCanvas.ts";
import {z} from 'zod'
import useUserData from "../hooks/useUserData.tsx";
import useUser from "../hooks/useUser.tsx";

const remoteRectSchema = z.array(z.object({
  row: z.number(),
  col: z.number(),
  color: z.string(),
}))

const CanvasOnline = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawingCanvasRef = useRef<DrawingCanvas | null>(null)
  const {userData, setUserData} = useUserData()
  const {user} = useUser()
  const [isMouseDown, setMouseDown] = useState<boolean>(false)

  const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(wsUrl,
    {
      shouldReconnect: () => true,
      onOpen: () => {
        console.log("Websocket ready");
      },
    },
  )

  const onLocalDraw = useCallback((data: { row: number, col: number, color: string }[]) => {
    sendJsonMessage({data});
  }, [sendJsonMessage])

  useEffect(() => {
    if (lastJsonMessage) {
      if (!(typeof lastJsonMessage === 'object' && 'data' in lastJsonMessage)) return
      try {
        const remoteRect = remoteRectSchema.parse(lastJsonMessage.data)
        drawingCanvasRef.current?.onRemoteRect(remoteRect)
      } catch (e) { /* empty */
      }
    }
  }, [lastJsonMessage])

  useEffect(() => {
    if (canvasRef.current) {
      const onDraw = user && user.role === 'admin' ? onLocalDraw : () => undefined
      drawingCanvasRef.current = new DrawingCanvas(canvasRef.current, onDraw, 100, 100)
      drawingCanvasRef.current.rectColor = userData.color
    }
    return () => {
      drawingCanvasRef.current?.cleanup()
    }
  }, [onLocalDraw]);

  function onColorPicked(color: Color) {
    setUserData({...userData, color: color.toString('css')})
    if (!drawingCanvasRef.current) return
    drawingCanvasRef.current.rectColor = color.toString('css')
  }

  return (
    <VStack width='100%'>
      <HStack>
        {
          readyState === WebSocket.OPEN ?
            (user && user.role === 'admin' ?
                <Badge colorPalette="green">online</Badge> :
                <Badge colorPalette="yellow">partial</Badge>
            ) :
            <Badge colorPalette="red">offline</Badge>
        }
        <ColorPicker.Root value={parseColor(userData.color)} maxW="200px" onValueChange={(e) => onColorPicked(e.value)}>
          <ColorPicker.HiddenInput/>
          {/*<ColorPicker.Label>Color</ColorPicker.Label>*/}
          <ColorPicker.Control>
            <ColorPicker.Input/>
            <ColorPicker.Trigger/>
          </ColorPicker.Control>
          <Portal>
            <ColorPicker.Positioner>
              <ColorPicker.Content>
                <ColorPicker.Area/>
                <HStack>
                  <ColorPicker.EyeDropper size="xs" variant="outline"/>
                  <ColorPicker.Sliders/>
                </HStack>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </Portal>
        </ColorPicker.Root>
      </HStack>
      <Flex m='auto' width="100%" justifyContent='center' alignItems='center'>
        <Container p='0' m='0' width='fit-content' height='fit-content' border='solid 1px #27272a' borderRadius='xs'>
          <canvas ref={canvasRef}
                  onPointerDown={() => setMouseDown(true)}
                  onPointerUp={() => setMouseDown(false)}
                  onPointerMove={(e) => isMouseDown && user && user.role === 'admin' && drawingCanvasRef.current?.onClick(e.clientX, e.clientY)}/>
        </Container>
      </Flex>
    </VStack>
  );
};

export default CanvasOnline;