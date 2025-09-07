import {api, request} from "./general.ts";

export async function clearCanvas() {
  return request(() => api.post(`/canvas/clear/`))
}

export async function setCanvasSize(data: { rows: number, cols: number }) {
  return request(() => api.post(`/canvas/size/`, data))
}
