FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN pnpm install

COPY . .

RUN pnpm db:generate

EXPOSE 4000

CMD ["pnpm", "dev"]