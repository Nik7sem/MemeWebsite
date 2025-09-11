FROM oven/bun:1 AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --production --frozen-lockfile

COPY . .
RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun-linux-x64 \
    --outfile server \
    index.ts

FROM debian:stable-slim
WORKDIR /app

COPY ./drizzle ./drizzle
COPY --from=builder /app/server ./server

CMD ["./server"]
