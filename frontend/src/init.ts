export const AppVersion = '0.0.1'
export const wsUrl = import.meta.env.DEV
  ? "ws://localhost:8001/ws"
  : `wss://${window.location.host}/ws`
