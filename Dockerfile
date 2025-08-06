FROM node:22-alpine as base

FROM base as production

WORKDIR /app

COPY package.json .

RUN npm install --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev-start"]


FROM base as development

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
