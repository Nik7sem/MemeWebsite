import {usersTable} from "../db/schema.ts";
import {db} from "../db/db.ts";
import {eq} from "drizzle-orm";

export default class UserService {
  static async addUser(user: typeof usersTable.$inferInsert) {
    try {
      await db.insert(usersTable).values({
        ...user,
        password: await Bun.password.hash(user.password)
      })
    } catch (error) {
      return
    }
    return user
  }

  static getUser(username: string) {
    return db.select().from(usersTable).where(
      eq(usersTable.username, username),
    ).get()
  }

  static async updateUser(username: string, role: string) {
    await db.update(usersTable).set({role}).where(eq(usersTable.username, username))
  }

  static async removeUser(id: number) {
    await db.delete(usersTable).where(
      eq(usersTable.id, id),
    )
  }

  static async getAllUsers() {
    return db.select({
      id: usersTable.id,
      username: usersTable.username,
      role: usersTable.role,
    }).from(usersTable);
  }
}