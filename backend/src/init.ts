import {CanvasService} from "./services/canvasService.ts";

export const PORT = parseInt(process.env.PORT || "8001", 10)
export const HOSTNAME = process.env.HOSTNAME || "127.0.0.1"
export const NODE_ENV = process.env.NODE_ENV || "development"
export const DB_FILE_NAME = process.env.DB_FILE_NAME || './data/db.sqlite'
export const VAPID_KEYS_FILE_NAME = process.env.VAPID_KEYS_FILE_NAME || './data/vapid.json'
export const COOKIE_AUTH_SECRET = process.env.COOKIE_AUTH_SECRET || 'Fischl von Luftschloss Narfidort'
export const JWT_SECRET = process.env.JWT_SECRET || 'Fischl von Luftschloss Narfidort'
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'

export const canvasService = new CanvasService(100, 100)
