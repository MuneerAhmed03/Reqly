FROM node:20-alpine

WORKDIR /usr/src/backend

COPY package.* .


RUN npm install

COPY . .

RUN npm run build


CMD ["node", "dist/index.js"]