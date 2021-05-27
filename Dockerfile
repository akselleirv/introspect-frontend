FROM node:alpine as build-stage

WORKDIR /app

COPY ./ /app/

RUN yarn install



RUN yarn build

# multi-stage -  we copy the build into a fresh nginx image
FROM nginx:stable-alpine

COPY --from=build-stage /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
