import {api, request} from "./general.ts";

export async function register(username: string, password: string) {
  return request(() => api.post(`/auth/register/`, {username: 'siegfried', password: '1111'}))
}

export async function login(username: string, password: string) {
  return request(() => api.get(`/auth/login/`, {params: {username: 'siegfried', password: '1111'}}))
}

export async function logout() {
  return request(() => api.get(`/auth/logout/`))
}

export async function profile() {
  return request(() => api.get(`/auth/profile/`))
}