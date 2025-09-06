import {Elysia} from "elysia";

export const wsRouter = new Elysia({
  websocket: {
    idleTimeout: 30
  }
})
  .ws('/ws', {
    async message(ws, message) {
      console.log('message', message)
      ws.send(JSON.stringify({ echo: message }))
    },
    async open(ws) {
      console.log('open', ws.id)
    },
    async close(ws) {
      console.log('close', ws.id)
    }
  })