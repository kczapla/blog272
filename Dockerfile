ARG NODE_IMAGE_TAG=16.1-alpine
FROM node:${NODE_IMAGE_TAG} as base
WORKDIR /app

FROM base as dependencies
COPY . .
RUN npm ci --production
RUN cp -R node_modules /prod_node_modules
RUN npm ci

FROM dependencies as test
RUN npm run style:check && npm run lint:check && npm run test:unit

FROM dependencies as test_features
COPY . .
CMD ["npm", "run", "test:features"]

FROM base as prod
ENV NODE_ENV=production
COPY --from=dependencies /prod_node_modules ./node_modules
COPY . .
CMD ["npm", "start"]
