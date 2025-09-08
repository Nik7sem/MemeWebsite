import {Elysia, t} from "elysia";
import UserService from "../services/userService.ts";
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import {ADMIN_USERNAME} from "../init.ts";

export const usersRouter = new Elysia({
  prefix: '/api/users',
})
  .use(authMiddleware)
  .resolve(async ({user, status}) => {
    if (!user) return status('Unauthorized');
    if (user.role !== 'admin') return status('Forbidden')
    return {user}
  })
  .get('/list/', async ({}) => {
    const users = await UserService.getAllUsers()
    return {message: {users}}
  })
  .delete('/delete/:id', async ({user, status, params: {id}}) => {
    if (id === 1) return status('Forbidden', {error: 'Permission denied'});
    console.log(`${user.username} deleted ${id}.`)
    await UserService.removeUser(id)
    return status("OK")
  }, {
    params: t.Object({
      id: t.Number(),
    })
  })
  .post('/update/', async ({status, body: {username, role}}) => {
    if (username === ADMIN_USERNAME) return status('Forbidden', {error: 'Permission denied'});
    await UserService.updateUser(username, role)
    return status("OK")
  }, {
    body: t.Object({
      username: t.String(),
      role: t.String(),
    })
  })