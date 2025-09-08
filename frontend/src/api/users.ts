import {api, request} from "./general.ts";
import {z} from "zod";

export async function getUsers() {
  return request(() => api.get(`/users/list/`), z.object({
    users: z.array(z.object({
      id: z.int(),
      username: z.string(),
      role: z.string(),
    }))
  }))
}

export async function deleteUser(id: number) {
  return request(() => api.delete(`/users/delete/${id}`))
}

export async function updateUser(username: string, role: string) {
  return request(() => api.post(`/users/update/`, {username, role}))
}