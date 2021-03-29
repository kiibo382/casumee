FROM gcr.io/distroless/nodejs:14

WORKDIR /app

ENV NODE_ENV=development

COPY ./dist /app/dist
COPY ./node_modules /app/node_modules

CMD ["dist/app.js"]