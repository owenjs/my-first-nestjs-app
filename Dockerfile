FROM node:17-alpine3.15

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000
CMD ["sh", "-c", "yarn run prebuild && yarn run build && yarn run start:prod"]
