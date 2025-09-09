import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Badge,
  type Color,
  ColorPicker,
  Container,
  Flex,
  HStack,
  parseColor,
  Portal,
  Presence,
  VStack
} from "@chakra-ui/react";
import useWebSocket from "react-use-websocket";
import {wsUrl} from "../init.ts";
import {type canvasRectsType, DrawingCanvas} from "../utils/DrawingCanvas.ts";
import {z} from 'zod'
import useUserData from "../hooks/useUserData.tsx";
import useUser from "../hooks/useUser.tsx";
import Loader from "./Loader.tsx";

const DrawMessageSchema = z.object({
  type: z.literal("draw"),
  data: z.array(
    z.object({
      row: z.number(),
      col: z.number(),
      color: z.string(),
    })
  ),
});

const SizeMessageSchema = z.object({
  type: z.literal("canvas"),
  data: z.object({
    size: z.object({
      rows: z.number(),
      cols: z.number(),
    }),
    array: z.array(z.array(z.union([
      z.object({
        color: z.string(),
      }),
      z.null()
    ])))
  })
});

const MessageSchema = z.discriminatedUnion("type", [
  DrawMessageSchema,
  SizeMessageSchema,
]);

const CanvasOnline = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawingCanvasRef = useRef<DrawingCanvas | null>(null)
  const {userData, setUserData} = useUserData()
  const {user} = useUser()
  const [isLoading, setLoading] = useState(true)
  const [isMouseDown, setMouseDown] = useState<boolean>(false)

  const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(wsUrl,
    {
      shouldReconnect: () => true,
      onOpen: () => {
        console.log("Websocket ready");
      },
    },
  )

  const onLocalDraw = useCallback((data: canvasRectsType) => {
    sendJsonMessage({type: 'draw', data});
  }, [sendJsonMessage])

  useEffect(() => {
    if (lastJsonMessage) {
      try {
        const message = MessageSchema.parse(lastJsonMessage)
        if (message.type === "draw") {
          drawingCanvasRef.current?.onRemoteRect(message.data)
        } else {
          if (canvasRef.current) {
            drawingCanvasRef.current?.cleanup()
            const onDraw = user && user.role === 'admin' ? onLocalDraw : () => undefined
            drawingCanvasRef.current = new DrawingCanvas(
              canvasRef.current,
              onDraw,
              message.data.array,
              message.data.size.rows,
              message.data.size.cols
            )
            drawingCanvasRef.current.rectColor = userData.color
          }
          setLoading(false)
        }
      } catch (err) {
        if (typeof err === 'object' && err && "name" in err && err.name === "ZodError") {
          console.error(err)
        }
      }
    }
  }, [lastJsonMessage])

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (isMouseDown) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventScroll, {passive: false});
    document.addEventListener('touchstart', preventScroll, {passive: false});

    return () => {
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('touchstart', preventScroll);
    };
  }, [isMouseDown]);

  function onColorPicked(color: Color) {
    setUserData({...userData, color: color.toString('css')})
    if (!drawingCanvasRef.current) return
    drawingCanvasRef.current.rectColor = color.toString('css')
  }

  function onMoveDraw(x: number, y: number) {
    if (isMouseDown && user && user.role === 'admin') {
      drawingCanvasRef.current?.onClick(x, y)
    }
  }

  function onMoveDown(x: number, y: number) {
    setMouseDown(true)
    if (user && user.role === 'admin') {
      drawingCanvasRef.current?.onClick(x, y)
    }
  }

  function onMoveUp() {
    setMouseDown(false)
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

      <Presence present={!isLoading}>
        <Flex m='auto' width="100%" justifyContent='center' alignItems='center' overflow='hidden'>
          <Container p='0' m='0' width='fit-content' height='fit-content' border='solid 1px #27272a'
                     borderRadius='xs'>
            <canvas ref={canvasRef}
                    onPointerDown={e => onMoveDown(e.clientX, e.clientY)}
                    onPointerUp={onMoveUp}
                    onPointerMove={e => onMoveDraw(e.clientX, e.clientY)}
                    onTouchStart={e => onMoveDown(e.touches[0].clientX, e.touches[0].clientY)}
                    onTouchEnd={onMoveUp}
                    onTouchMove={e => onMoveDraw(e.touches[0].clientX, e.touches[0].clientY)}/>
          </Container>
        </Flex>
      </Presence>
      {
        isLoading ?
          <Loader/> : <></>
      }
    </VStack>
  );
};

export default CanvasOnline;