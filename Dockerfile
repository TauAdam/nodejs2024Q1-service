FROM node:20-alpine AS base
WORKDIR /app
EXPOSE 4000

FROM base AS dev
COPY package.json package-lock.json ./
COPY ./prisma ./prisma
RUN npm ci && npx prisma generate && npm cache clean --force
COPY . .
CMD npm run start:dev