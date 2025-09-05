import {Elysia} from 'elysia'
import {authRouter} from "./routers/authRouter.ts";
import {HOSTNAME, NODE_ENV, PORT} from "./init.ts";
import {migrateDB} from "./db/db.ts";

const app = new Elysia({prefix: '/api'})
  .onRequest(({request}) => {
    console.log(`${request.method} ${request.url}`);
  })
  .use(authRouter)
  .listen({
    port: PORT,
    hostname: HOSTNAME,
  })

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} in ${NODE_ENV} mode.`
)
migrateDB()
