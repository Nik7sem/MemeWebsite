export const AppVersion = '0.1.6'
export const wsUrl = import.meta.env.DEV
  ? "ws://localhost:8001/ws"
  : `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/ws`
