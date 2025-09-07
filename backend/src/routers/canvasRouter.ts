import {Elysia, t} from "elysia";
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import {canvasService} from "../init.ts";

export const canvasRouter = new Elysia({
  prefix: '/api/canvas',
})
  .use(authMiddleware)
  .resolve(async ({user, status}) => {
    if (!user) return status('Unauthorized');
    if (user.role !== 'admin') return status('Forbidden')
    return {user}
  })
  .post('/clear/', async ({status}) => {
    canvasService.clear()
    return status("OK")
  })
  .post('/size/', async ({status, body: {rows, cols}}) => {
    canvasService.setSize(rows, cols);
    return status("OK")
  }, {
    body: t.Object({
      rows: t.Number(),
      cols: t.Number(),
    })
  })
