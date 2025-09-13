import webpush, {type PushSubscription, type VapidKeys} from "web-push"
import {VAPID_KEYS_FILE_NAME} from "../init.ts";
import {db} from "../db/db.ts";
import {subscriptionsTable} from "../db/schema.ts";
import {eq} from "drizzle-orm";
import UserService from "./userService.ts";

export class NotificationService {
  private vapidKeys!: VapidKeys

  constructor() {
    this.setVapidKeys().then(vapid => {
      this.vapidKeys = vapid
      webpush.setVapidDetails(
        "mailto:you@example.com",
        vapid.publicKey,
        vapid.privateKey
      )
    })
  }

  private async setVapidKeys() {
    let vapid = await this.getVapidFromJson()
    if (!vapid) {
      return await this.generateVapidAndSave()
    }
    return vapid
  }

  private async generateVapidAndSave() {
    const vapid = webpush.generateVAPIDKeys()
    await Bun.write(VAPID_KEYS_FILE_NAME, JSON.stringify(vapid))
    console.log(`Vapid created and saved to ${VAPID_KEYS_FILE_NAME}`)
    return vapid
  }

  private async getVapidFromJson() {
    try {
      const file = Bun.file(VAPID_KEYS_FILE_NAME)
      const contents = await file.json();
      if (!contents) return null
      return contents as VapidKeys;
    } catch (e) {
      return null
    }
  }

  public getNotificationKey() {
    return this.vapidKeys.publicKey
  }

  public async sendNotification(userId: number, title: string, body: string) {
    const subs = await db.select().from(subscriptionsTable).where(
      eq(subscriptionsTable.userId, userId),
    )
    console.log(`Sending notifications to user ${userId} in the amount of ${subs.length}`)
    for (const sub of subs) {
      try {
        await webpush.sendNotification({
            endpoint: sub.endpoint,
            expirationTime: sub.expirationTime,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth
            }
          },
          JSON.stringify({title, body})
        )
      } catch (e) {
        console.error(e)
      }
    }
  }

  public async addSubscription(sub: PushSubscription, userId: number, userAgent?: string) {
    await db.insert(subscriptionsTable).values({
      userId,
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
      userAgent
    })
  }

  public async removeSubscription(userId: number) {
    await db.delete(subscriptionsTable).where(
      eq(subscriptionsTable.userId, userId),
    )
  }

  public async notifyAdmins(title: string, body: string) {
    const users = await UserService.getAllUsers()
    for (const user of users) {
      if (user.role === 'admin') {
        this.sendNotification(user.id, title, body)
      }
    }
  }
}