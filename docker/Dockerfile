FROM node:16.14.0-stretch as builder

ENV NODE_ENV development
RUN apt update && apt install python3 make g++

COPY . /app
WORKDIR /app

RUN npm ci --quiet
RUN npm run build
RUN npm ci --only=production --ignore-scripts

RUN ls -al /app/build

FROM node:16.14.0-alpine

ENV NODE_ENV production

WORKDIR /app
COPY --from=builder /app/build /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/packages/types /app/node_modules/@local/types

# We need suunto connecto as dependency since we dont't have workouts in db at the moment
COPY --from=builder /app/packages/suunto-connector /app/node_modules/@local/suunto-connector

CMD [ "node", "/app/server/main.js" ]

EXPOSE 4000
