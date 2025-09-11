import {Elysia} from 'elysia'
import {authRouter} from "./routers/authRouter.ts";
import {ADMIN_USERNAME, ADMIN_PASSWORD, HOSTNAME, NODE_ENV, PORT} from "./init.ts";
import {migrateDB} from "./db/db.ts";
import UserService from "./services/userService.ts";
import {usersRouter} from "./routers/usersRouter.ts";
import {wsRouter} from "./routers/wsRouter.ts";
import {canvasRouter} from "./routers/canvasRouter.ts";

const app = new Elysia()
  .onTransform(function log({body, params, query, path, request: {method}}) {
    console.log(`${method} ${path}`, {
      body,
      params,
      query
    })
  })
  .use(authRouter)
  .use(usersRouter)
  .use(canvasRouter)
  .use(wsRouter)
  .listen({
    port: PORT,
    hostname: HOSTNAME,
  })

async function init() {
  migrateDB()

  // await UserService.removeUser(ADMIN_NAME)
  const user = await UserService.addUser({
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
    role: 'admin'
  })

  if (user) {
    console.log('Admin user created.')
  } else {
    console.log('Admin user already created.')
  }
}

init().then(() => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} in ${NODE_ENV} mode.`
  )
})

