# ---------- build ----------
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# deps nativas para libs com bindings (bcrypt, prisma, etc.)
RUN apt-get update && apt-get install -y python3 make g++ openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY prisma ./prisma
COPY src ./src

# Prisma client + build Nest
RUN npx prisma generate
RUN npm run build

# ---------- runtime ----------
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# use o node_modules já compilado no builder (evita rebuild do bcrypt)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# artefatos
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# prisma bin/engines
COPY --from=builder /app/node_modules/.bin/prisma /usr/local/bin/prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma

# entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
