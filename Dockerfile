ARG NODE_IMAGE_TAG
FROM node:${NODE_IMAGE_TAG} as base
WORKDIR /app

FROM base as dependencies
COPY package-lock.json .
COPY package.json .
RUN npm ci --production
RUN cp -R node_modules /prod_node_modules
RUN npm ci

FROM base as test
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run style:check && npm run lint:check && npm run test:unit

FROM base as test_features
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
CMD ["npm", "run", "test:features"]

FROM base as prod
ENV NODE_ENV=production
COPY --from=dependencies /prod_node_modules ./node_modules
COPY . .
CMD ["npm", "start"]
