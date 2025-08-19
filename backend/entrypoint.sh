#!/bin/sh
set -e

echo "[backend] Running prisma migrate deploy..."
npx prisma migrate deploy

echo "[backend] Running prisma db seed (if configured)..."
npx prisma db seed || true

echo "[backend] Starting NestJS application..."
exec node dist/src/main.js
