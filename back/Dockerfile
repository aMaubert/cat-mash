FROM node:20 AS ts-build
WORKDIR /workspace
COPY . /workspace/
RUN npm install
RUN npm run build

FROM node:20
WORKDIR /workspace
ARG PORT
COPY package.json /workspace/
RUN npm install --production
COPY --from=ts-build /workspace/dist /workspace/dist

EXPOSE $PORT

CMD npm run start:prod

