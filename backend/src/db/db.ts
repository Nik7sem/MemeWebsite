import {drizzle} from 'drizzle-orm/bun-sqlite';
import {DB_FILE_NAME} from "../init.ts";
import {migrate} from 'drizzle-orm/bun-sqlite/migrator'
import type {MigrationConfig} from "drizzle-orm/migrator";

export const db = drizzle(DB_FILE_NAME)

const migrationConfig: MigrationConfig = {
  migrationsFolder: './drizzle',
  migrationsSchema: './src/db/schema.ts',
}

export function migrateDB() {
  console.log('Migrate database: ', migrationConfig);
  migrate(db, migrationConfig)
}
