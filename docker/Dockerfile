FROM node:14.5.0-alpine as builder

ENV NODE_ENV production

COPY . /app

WORKDIR /app
RUN ./bin/buildApp

FROM node:14.5.0-alpine

ENV NODE_ENV production

WORKDIR /app
COPY --from=builder /app/build /app

EXPOSE 4000