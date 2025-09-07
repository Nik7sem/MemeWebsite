import {Elysia, t} from "elysia";
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import {canvasService} from "../init.ts";

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
      ws.subscribe('draw')
    },
    async close(ws) {
      console.log('close', ws.id)
    },
    async message(ws, message) {
      if (ws.data.user.role !== 'admin') return
      console.log('draw', message.data.length, ws.data.user.username)
      canvasService.draw(message.data)
      ws.publish('draw', {type: 'draw', data: message.data})
    },
  })