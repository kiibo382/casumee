# build layer(typescript)
# FROM node:14-slim as builder

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm ci

# COPY . .

# RUN npm run build

# package install layer
FROM node:14-slim as node_modules

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

# run layer
FROM gcr.io/distroless/nodejs:14

WORKDIR /app

ENV NODE_ENV=production
ENV HOST 0.0.0.0

EXPOSE 8080

COPY ./dist /app/dist
COPY --from=node_modules /app/node_modules /app/node_modules

CMD ["dist/app.js"]