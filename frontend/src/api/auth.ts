import axios from "axios";

export async function register() {
  const data = await axios.post(`/api/auth/register/`, {username: 'siegfried', password: '1111'})
  return data
}

export async function login() {
  const data = await axios.get(`/api/auth/login/`, {params: {username: 'siegfried', password: '1111'}})
  return data
}

export async function logout() {
  const data = await axios.get(`/api/auth/logout/`)
  return data
}

export async function profile() {
  const data = await axios.get(`/api/auth/profile/`)
  return data
}