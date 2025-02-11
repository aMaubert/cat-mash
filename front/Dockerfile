FROM node:20 AS vue-build
WORKDIR /workspace

COPY . /workspace/
RUN npm install
RUN npm run build

FROM nginx:stable
RUN mkdir /app
COPY --from=vue-build /workspace/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
