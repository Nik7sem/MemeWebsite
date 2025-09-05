import {api, request} from "./general.ts";
import {z} from "zod";

const authScheme = z.object({
  role: z.string()
})

export async function register(username: string, password: string) {
  return request(() => api.post(`/auth/register/`, {username, password}), authScheme)
}

export async function login(username: string, password: string) {
  return request(() => api.get(`/auth/login/`, {params: {username, password}}), authScheme)
}

export async function profile() {
  return request(() => api.get(`/auth/profile/`), authScheme)
}

export async function logout() {
  return request(() => api.get(`/auth/logout/`))
}