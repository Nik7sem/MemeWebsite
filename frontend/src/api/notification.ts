import {api, request} from "./general.ts";
import {z} from "zod";

export function getNotificationKey() {
  return request(() => api.get('/notification/key'), z.object({
    key: z.string(),
  }));
}

export function sendSubscription(subscription: string) {
  return request(() => api.post('/notification/add', {subscription}))
}

export function removeSubscription() {
  return request(() => api.delete('/notification/remove'))
}

export function sendNotification(data: { userId: number, title: string, body: string }) {
  return request(() => api.post(`/notification/send`, data))
}
