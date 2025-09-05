import axios from "axios";

export const api = axios.create({baseURL: '/api'})

export async function request<T>(fn: () => Promise<{ data: T }>): Promise<{ data?: T; error?: string }> {
  try {
    const res = await fn();
    return {data: res.data};
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {error: err.response?.data?.error || err.message};
    }
    return {error: "Unknown error"};
  }
}