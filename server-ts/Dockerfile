# build layer(typescript)
FROM node:14-slim as builder

RUN adduser -D myuser && chown -R myuser /app

USER myuser

WORKDIR /app

COPY package.json package-lock.json ./

RUN cpm ci

COPY . .

RUN npm run build

# package install layer
FROM node:14-slim as node_modules

RUN adduser -D myuser && chown -R myuser /app

USER myuser

WORKDIR /app

COPY package.json package-lock.json ./

RUN cpm ci --only=production

# run layer
FROM gcr.io/distroless/nodejs:14

RUN adduser -D myuser && chown -R myuser /app

USER myuser

WORKDIR /app

ENV NODE_ENV=production
ENV HOST 0.0.0.0

EXPOSE 8080

COPY --from=builder /app/dist /app/dist
COPY --from=node_modules /app/node_modules /app/node_modules

CMD ["dist/app.js"]