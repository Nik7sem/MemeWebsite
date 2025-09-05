import {drizzle} from 'drizzle-orm/bun-sqlite';
import {DB_FILE_NAME} from "../init.ts";
import {migrate} from 'drizzle-orm/bun-sqlite/migrator'

export const db = drizzle(DB_FILE_NAME)

export function migrateDB() {
  migrate(db, {
    migrationsFolder: './drizzle',
    migrationsSchema: './src/db/schema.ts',
  })
}
