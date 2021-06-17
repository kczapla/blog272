import path from "path"

import mongodb from "mongodb"
const { MongoClient } = mongodb

import { appConfig, mongoDbConfig, securityConfig } from "./config"
import { WebApp, RouterComposite } from "./app"

import { YamlDocsRepository } from "./domain/docs/infrastructure"
import { ReadDocsService } from "./domain/docs/application"
import { DocsResource } from "./domain/docs/resource"

import { BlogResource } from "./domain/blog/resource"
import {
  MongoPostRepository,
  MongoPostView,
} from "./domain/blog/infrastructure"
import {
  CreatePostService,
  DeletePostService,
  ReadPostService,
} from "./domain/blog/application"

import CreateUserUseCase from "./domain/users/use-cases/create-user/create-user-use-case"
import DeleteUserUseCase from "./domain/users/use-cases/delete-user/delete-user-use-case"
import GetAuthenticationTokenUseCase from "./domain/users/use-cases/get-authentication-token-use-case/get-authentication-token-use-case"

import { UserResource } from "./domain/users/resource"

import {
  CryptoEncriptionService,
  MongoDBUsersRepository,
  JWTTokenService,
} from "./domain/users/infrastructure"

async function main() {
  const openApiDocPath = path.join(
    path.dirname(""),
    "/docs/api/v0/openapi.yaml"
  )
  const docsRepository = new YamlDocsRepository(openApiDocPath)
  const readDocsService = new ReadDocsService(docsRepository)
  const docsResource = new DocsResource(readDocsService)

  const client = new MongoClient(
    mongoDbConfig.getUri(),
    mongoDbConfig.getConnectionOptions()
  )

  await client.connect()
  await client.db("admin").command({ ping: 1 })
  console.log("Connected to MongoDB")

  const db = client.db(mongoDbConfig.getMongoDbName())

  const yetAnotherPostRepository = new MongoPostRepository(db)
  const postView = new MongoPostView(db)
  const readPostService = new ReadPostService(postView)
  const createPostService = new CreatePostService(yetAnotherPostRepository)
  const deletePostService = new DeletePostService(yetAnotherPostRepository)
  const blogResource = new BlogResource(
    createPostService,
    deletePostService,
    readPostService
  )

  const usersRepository = new MongoDBUsersRepository(db)
  const encriptionService = new CryptoEncriptionService(10, 64)
  const createUserUserCase = new CreateUserUseCase(
    usersRepository,
    encriptionService
  )

  const jwtTokenService = new JWTTokenService(
    "3min",
    securityConfig.getJwtSecret()
  )

  const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

  const getAuthenticationTokenUseCase = new GetAuthenticationTokenUseCase(
    usersRepository,
    encriptionService,
    jwtTokenService
  )

  const usersRouter = new UserResource(
    createUserUserCase,
    deleteUserUseCase,
    jwtTokenService,
    getAuthenticationTokenUseCase,
    usersRepository
  )

  const versionZeroRouter = new RouterComposite("/v0")
  versionZeroRouter.addRouter(docsResource)
  versionZeroRouter.addRouter(usersRouter)
  versionZeroRouter.addRouter(blogResource)
  const apiRouter = new RouterComposite("/api")

  apiRouter.addRouter(versionZeroRouter)
  const webApp = new WebApp({ port: appConfig.getPort() }, apiRouter)
  webApp.start()
}

main()
