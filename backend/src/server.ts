const PORT = parseInt(process.env.PORT || "8001", 10)
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1"
const NODE_ENV = process.env.NODE_ENV || "development"

const server = Bun.serve({
  port: PORT,
  hostname: HOSTNAME,
  development: NODE_ENV === "development",
  // tls: NODE_ENV === "development" ? {
  //   cert: Bun.file('./certs/fullchain.pem'),
  //   key: Bun.file('./certs/server-key.pem'),
  // } : undefined,
  fetch(req, server) {
    return new Response("Not implemented", {status: 500});
  }
})

console.log(`Server listening on "${server.url}" in "${NODE_ENV}" mode`);