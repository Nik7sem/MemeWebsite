import axios from "axios";
import {type ZodType} from "zod";

export const api = axios.create({baseURL: '/api'})
export type ApiResponse<T> = { data?: T; error?: string };

// Generic request
export async function request<T>(
  fn: () => Promise<{ data: object }>,
  schema?: ZodType<T>
): Promise<ApiResponse<T>> {
  try {
    const res = await fn();

    if (schema) {
      if (!('message' in res.data)) return {error: "Invalid response from server"};
      return {data: schema.parse(res.data.message)};
    }

    return {data: res.data as T};
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {error: err.response?.data?.error || err.message};
    }
    if (typeof err === 'object' && err && "name" in err && err.name === "ZodError") {
      return {error: "Invalid response from server"};
    }
    return {error: "Unknown error"};
  }
}