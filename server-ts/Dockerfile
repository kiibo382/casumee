# Build Layer (Typescript)
FROM node:14-slim as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build


# Package install Layer
FROM node:14-slim as node_modules

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


# Run Layer
FROM gcr.io/distroless/nodejs:14

WORKDIR /app

ENV NODE_ENV=development

COPY --from=build /app/dist /app/dist
COPY --from=node_modules /app/node_modules /app/node_modules

CMD ["dist/app.js"]