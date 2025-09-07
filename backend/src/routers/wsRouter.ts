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
      data: t.String()
    }),
    cookie: t.Cookie({
      auth: t.String()
    }),
    async open(ws) {
      console.log('open', ws.id, ws.data.user.username)
    },
    async close(ws) {
      console.log('close', ws.id)
    },
    async message(ws, message) {
      console.log('message', message, ws.data.user.username)
      ws.send({echo: message})
    },
  })