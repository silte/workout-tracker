FROM node:15.1.0-alpine as builder

ENV NODE_ENV production
ENV SASS_PATH ./src/scss

COPY . /app
WORKDIR /app

RUN apk add --no-cache python2 alpine-sdk

RUN npm ci --quiet -f
RUN npm run build


FROM node:15.1.0-alpine

ENV NODE_ENV production

WORKDIR /app
COPY --from=builder /app/build /app

CMD [ "node", "/app/app/server.js" ]

EXPOSE 4000