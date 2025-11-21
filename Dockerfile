FROM node:22.14.0-alpine AS build
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist/taste-board/browser /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]