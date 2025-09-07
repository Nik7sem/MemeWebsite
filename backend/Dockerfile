FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun-linux-x64 \
    --outfile server \
    index.ts
RUN bunx drizzle-kit generate

FROM debian:stable-slim
WORKDIR /app

COPY --from=build /app/server ./server
COPY --from=build /app/drizzle/ ./drizzle/

CMD ["./server"]
