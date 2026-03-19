# Instalação de dependências
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

# Build da aplicação
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Gera o cliente do Prisma e compila o Next.js
RUN npx prisma generate
RUN npm run build

# Imagem final de produção
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copia apenas os arquivos necessários gerados no build standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Inicia o servidor do Next.js
CMD ["node", "server.js"]
