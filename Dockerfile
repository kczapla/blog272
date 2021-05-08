FROM node:15.12-alpine as base

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as unit_test

RUN npm ci
COPY . .
CMD ["npm", "run", "test"]

FROM base as acc_tests
RUN npm ci
COPY . .
CMD ["npm", "run", "acc_tests"]

FROM base as prod
ENV NODE_ENV=production
RUN npm ci --production
COPY . .
CMD ["npm", "start"]
