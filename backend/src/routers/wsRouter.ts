import {Elysia, t} from "elysia";
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import {canvasService} from "../init.ts";
import type {Server} from "elysia/universal";

// Define the variants
const DrawMessage = t.Object({
  type: t.Literal('draw'),
  data: t.Array(
    t.Object({
      row: t.Number(),
      col: t.Number(),
      color: t.String()
    })
  )
})

const CanvasMessage = t.Union([DrawMessage])

export function broadcastCanvas(server: Server | null) {
  server?.publish("broadcast", JSON.stringify({
    type: 'canvas',
    data: {size: canvasService.getArraySize(), array: canvasService.array}
  }))
}

export const wsRouter = new Elysia({
  websocket: {
    idleTimeout: 30
  }
})
  .use(authMiddleware)
  .resolve(async ({user}) => {
    if (!user) {
      throw new Error('Unauthorized')
    }
    return {user}
  })
  .ws('/ws', {
    body: CanvasMessage,
    cookie: t.Cookie({
      auth: t.String()
    }),
    async open(ws) {
      console.log('open', ws.id, ws.data.user.username)
      ws.send({type: 'canvas', data: {size: canvasService.getArraySize(), array: canvasService.array}})
      ws.subscribe('broadcast')
    },
    async close(ws) {
      console.log('close', ws.id)
      ws.unsubscribe('broadcast')
    },
    async message(ws, message) {
      if (ws.data.user.role !== 'admin') return
      console.log('draw', message.data.length, ws.data.user.username)
      canvasService.draw(message.data)
      ws.publish('broadcast', {type: 'draw', data: message.data})
    },
  })