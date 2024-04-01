FROM node:20-alpine AS base
WORKDIR /app
EXPOSE 4000

FROM base AS dev
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force
COPY . .
CMD ["npm", "run", "start:migrate"]