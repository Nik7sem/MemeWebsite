FROM oven/bun:debian AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --production --frozen-lockfile

ENV DEBIAN_FRONTEND=noninteractive
RUN echo "deb http://deb.debian.org/debian bookworm-backports main" >> /etc/apt/sources.list
RUN apt-get update && \
    apt-get install -y --no-install-recommends -t bookworm-backports upx-ucl

RUN upx -9 -o ./bun-compressed /usr/local/bin/bun

COPY . .
RUN ./bun-compressed build \
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
