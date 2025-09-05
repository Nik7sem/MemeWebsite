import {Cookie, Elysia, t} from "elysia";
import {jwt} from '@elysiajs/jwt'
import {db} from "../db/db.ts";
import {usersTable} from "../db/schema.ts";
import {password as passwordBun} from "bun";
import {COOKIE_AUTH_SECRET, JWT_SECRET} from "../init.ts";

function setAuthCookie(value: string, auth: Cookie<string | undefined> | undefined) {
  auth?.set({
    value,
    httpOnly: true,
    maxAge: 7 * 86400,
    sameSite: "strict",
    path: '/',
  })
}

export const authRouter = new Elysia({
  prefix: '/auth',
  // cookie: {
  //   secrets: COOKIE_AUTH_SECRET,
  //   sign: ["auth"],
  // },
})
  .use(
    jwt({
      name: 'jwt',
      secret: JWT_SECRET
    })
  )
  .post('/register/', async ({jwt, body: {username, password}, cookie: {auth}}) => {
    const passwordHash = await passwordBun.hash(password)
    console.log(`Register ${username}, ${passwordHash}.`);
    const value = await jwt.sign({username})
    try {
      console.log(await db.select().from(usersTable))
    } catch (err) {
      console.log(err)
    }

    setAuthCookie(value, auth)
    return `Register as ${value}`
  }, {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    })
  })
  .get('/login/', async ({jwt, query: {username, password}, cookie: {auth}}) => {
    const passwordHash = await passwordBun.hash(password)
    console.log(`Login ${username}, ${passwordHash}.`);
    const value = await jwt.sign({username})
    setAuthCookie(value, auth)
    return `Login as ${value}`
  }, {
    query: t.Object({
      username: t.String(),
      password: t.String(),
    })
  })
  .get('/logout/', async ({cookie: {auth}}) => {
    auth.remove()
    return `Logout`
  }, {
    cookie: t.Cookie({
      auth: t.String()
    })
  })
  .get('/profile/', async ({jwt, status, cookie: {auth}}) => {
    const profile = await jwt.verify(auth.value)

    if (!profile)
      return status(401, 'Unauthorized')

    return `Hello ${profile.username}!`
  }, {
    cookie: t.Cookie({
      auth: t.String()
    })
  })
