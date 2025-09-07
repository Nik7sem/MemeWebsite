import {Cookie, Elysia, t} from "elysia";
import {jwt} from '@elysiajs/jwt'
import {JWT_SECRET} from "../init.ts";
import UserService from "../services/userService.ts";

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
  prefix: '/api/auth',
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
  .model(
    {
      credentials: t.Object({
        username: t.String(),
        password: t.String()
      }),
      authCookie: t.Cookie({
        auth: t.String()
      })
    }
  )
  .post('/register/', async ({jwt, status, body: {username, password}, cookie: {auth}}) => {
    const user = await UserService.addUser({
      username, password, role: 'user'
    })

    if (!user) return status('Unauthorized', {error: "User already exists"})

    console.log(`Register ${username}.`);

    const value = await jwt.sign({username})
    setAuthCookie(value, auth)
    return {message: {username: user.username, role: user.role}}
  }, {
    body: 'credentials'
  })
  .get('/login/', async ({jwt, status, query: {username, password}, cookie: {auth}}) => {
    const user = UserService.getUser(username)
    if (!user) return status('Unauthorized', {error: "User not found"});

    try {
      const valid = await Bun.password.verify(password, user.password);
      if (!valid) return status('Unauthorized', {error: "Invalid password"});
    } catch (err) {
      return status('Unauthorized', {error: "Something wrong with credentials"});
    }

    console.log(`Login ${username}.`);

    const value = await jwt.sign({username})
    setAuthCookie(value, auth)
    return {message: {username: user.username, role: user.role}}
  }, {
    query: 'credentials'
  })
  .get('/logout/', async ({status, cookie: {auth}}) => {
    auth.remove()
    return status('OK')
  }, {
    cookie: 'authCookie'
  })
  .get('/profile/', async ({jwt, status, cookie: {auth}}) => {
    const profile = await jwt.verify(auth.value)

    if (!profile || typeof profile.username !== 'string') {
      return status("Unauthorized")
    }

    const user = UserService.getUser(profile.username)
    if (!user) return status('Unauthorized', {error: "User not found"});

    return {message: {username: user.username, role: user.role}}
  }, {
    cookie: 'authCookie'
  })
