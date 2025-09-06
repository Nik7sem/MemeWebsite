import {Elysia, t} from "elysia";
import {jwt} from "@elysiajs/jwt";
import {JWT_SECRET} from "../init.ts";
import UserService from "../services/userService.ts";

export const usersRouter = new Elysia({
  prefix: '/users',
})
  .guard({
    cookie: t.Cookie({
      auth: t.String()
    })
  })
  .use(
    jwt({
      name: 'jwt',
      secret: JWT_SECRET
    })
  )
  .derive(async ({jwt, status, cookie: {auth}}) => {
    const profile = await jwt.verify(auth.value)

    if (!profile || typeof profile.username !== 'string') {
      return status("Unauthorized")
    }

    const user = UserService.getUser(profile.username)
    if (!user) return status('Unauthorized', {error: "User not found"});

    if (user.role !== 'admin') return status('Forbidden')
  })
  .get('/list/', async ({}) => {
    const users = await UserService.getAllUsers()
    return {message: {users}}
  })
  .delete('/delete/:username', async ({status, params: {username}}) => {
    await UserService.removeUser(username)
    return status("OK")
  }, {
    params: t.Object({
      username: t.String(),
    })
  })
  .post('/update/', async ({status, body: {username, role}}) => {
    await UserService.updateUser(username, role)
    return status("OK")
  }, {
    body: t.Object({
      username: t.String(),
      role: t.String(),
    })
  })