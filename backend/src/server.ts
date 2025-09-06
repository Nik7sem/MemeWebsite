import {Elysia} from 'elysia'
import {authRouter} from "./routers/authRouter.ts";
import {ADMIN_NAME, ADMIN_PASSWORD, HOSTNAME, NODE_ENV, PORT} from "./init.ts";
import {migrateDB} from "./db/db.ts";
import UserService from "./services/userService.ts";
import {usersRouter} from "./routers/usersRouter.ts";
import {wsRouter} from "./routers/wstRouter.ts";

const app = new Elysia()
  .onRequest(({request}) => {
    console.log(`${request.method} ${request.url}`);
  })
  .use(authRouter)
  .use(usersRouter)
  .use(wsRouter)
  .listen({
    port: PORT,
    hostname: HOSTNAME,
  })

async function init() {
  migrateDB()
  // await UserService.removeUser(ADMIN_NAME)
  const user = await UserService.addUser({
    username: ADMIN_NAME,
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

