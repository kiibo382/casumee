# build layer
FROM node:14-slim as builder

RUN adduser -D myuser && chown -R myuser /app

USER myuser

WORKDIR /app

COPY . .

RUN yarn install \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive \
    --production=false

RUN yarn build

RUN rm -rf node_modules && \
    NODE_ENV=production yarn install \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --production=true

# run layer
FROM node:lts-alpine

RUN adduser -D myuser && chown -R myuser /app

USER myuser

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]