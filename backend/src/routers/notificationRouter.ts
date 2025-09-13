import {Elysia, t} from "elysia";
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import {NotificationService} from "../services/notificationService.ts";

export const notificationService = new NotificationService();

export const notificationRouter = new Elysia({
  prefix: '/api/notification',
})
  .use(authMiddleware)
  .resolve(async ({user, status}) => {
    if (!user) return status('Unauthorized');
    if (user.role !== 'admin') return status('Forbidden')
    return {user}
  })
  .get('/key/', () => {
    return {message: {key: notificationService.getNotificationKey()}}
  })
  .post('/add/', async ({user, body: {subscription}, headers, status}) => {
    await notificationService.addSubscription(subscription, user.id, headers["user-agent"])
    return status("OK")
  }, {
    body: t.Object({
      subscription: t.ObjectString({
        endpoint: t.String(),
        expirationTime: t.Optional(t.Any([t.Null(), t.Number()])),
        keys: t.Object({
          p256dh: t.String(),
          auth: t.String(),
        })
      })
    })
  })
  .delete('/remove/', async ({user, status}) => {
    await notificationService.removeSubscription(user.id)
    return status("OK")
  })
  .post('/send/', async ({user, body: {userId, title, body}, status}) => {
    await notificationService.sendNotification(userId, title, body);
    return status("OK")
  }, {
    body: t.Object({
      userId: t.Number(),
      title: t.String(),
      body: t.String(),
    })
  })