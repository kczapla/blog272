import path from "path"

import mongodb from "mongodb"
const { MongoClient } = mongodb

import { appConfig, mongoDbConfig } from "./config"
import { DocsRouter, PostsRouter, RouterComposite } from "./api"
import { WebApp } from "./app"
import { DocsController, PostsController } from "./controllers"
import { OpenApiDoc, ReadPost, CreatePost, DeletePost } from "./domain"
import { PostsService } from "./services"
import { OpenApiYamlFileRepository, MongoPostsRepository } from "./repositories"

import UsersHttpAdapter from "./domain/users/infrastructure/users-http-adapter"
import CreateUserUseCase from "./domain/users/use-cases/create-user/create-user-use-case"
import CryptoEncriptionService from "./domain/users/infrastructure/crypto-encryption-service"

async function main() {
  const openApiDocPath = path.join(
    path.dirname(""),
    "/docs/api/v0/openapi.yaml"
  )
  const docsService = new OpenApiYamlFileRepository(openApiDocPath)
  const docs = new OpenApiDoc(docsService)

  const docsController = new DocsController(docs)
  const url = `${appConfig.getUrl()}/api/v0/docs`
  const docsRouter = new DocsRouter(docsController, url)

  const client = new MongoClient(
    mongoDbConfig.getUri(),
    mongoDbConfig.getConnectionOptions()
  )

  await client.connect()
  await client.db("admin").command({ ping: 1 })
  console.log("Connected to MongoDB")

  const db = client.db(mongoDbConfig.getMongoDbName())

  const postsRepository = new MongoPostsRepository(db.collection("posts"))
  const postsService = new PostsService(postsRepository)
  const posts = new ReadPost(postsService)
  const createPosts = new CreatePost(postsService)
  const deletePost = new DeletePost(postsService)
  const postsController = new PostsController(posts, createPosts, deletePost)
  const postsRouter = new PostsRouter(postsController)

  const encriptionService = new CryptoEncriptionService(10, 64)
  const createUserUserCase = new CreateUserUseCase(
    { exists: async () => {}, save: async () => {} },
    encriptionService
  )
  const usersRouter = new UsersHttpAdapter(createUserUserCase)

  const versionZeroRouter = new RouterComposite("/v0")
  versionZeroRouter.addRouter(docsRouter)
  versionZeroRouter.addRouter(postsRouter)
  versionZeroRouter.addRouter(usersRouter)
  const apiRouter = new RouterComposite("/api")

  apiRouter.addRouter(versionZeroRouter)
  const webApp = new WebApp({ port: appConfig.getPort() }, apiRouter)
  webApp.start()
}

main()
