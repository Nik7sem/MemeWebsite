import {Elysia, t} from "elysia";
import {authMiddleware} from "../middlewares/authMiddleware.ts";

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
    body: t.Object({
      data: t.Array(t.Object({
        row: t.Number(),
        col: t.Number(),
        color: t.String()
      }))
    }),
    cookie: t.Cookie({
      auth: t.String()
    }),
    async open(ws) {
      console.log('open', ws.id, ws.data.user.username)
      ws.subscribe('draw')
    },
    async close(ws) {
      console.log('close', ws.id)
    },
    async message(ws, message) {
      if (ws.data.user.role !== 'admin') return
      console.log('draw', message.data.length, ws.data.user.username)
      ws.publish('draw', message)
    },
  })