import {Elysia} from "elysia";
import UserService from "../services/userService.ts";
import {jwt} from "@elysiajs/jwt";
import {JWT_SECRET} from "../init.ts";

export const authMiddleware = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: JWT_SECRET
    })
  )
  .resolve({as: 'scoped'}, async ({jwt, cookie: {auth}}) => {
    console.log('AUTH')
    if (!auth) return {user: null}
    const profile = await jwt.verify(auth.value)

    if (!profile || typeof profile.username !== 'string') {
      return {user: null}
    }

    const user = UserService.getUser(profile.username)
    if (!user) return {user: null}

    return {user}
  })