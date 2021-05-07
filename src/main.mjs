import path from "path"

import mongodb from "mongodb"
const { MongoClient } = mongodb

import { appConfig, mongoDbConfig } from "./config"
import { DocsRouter, PostsRouter, RouterComposite } from "./api"
import { WebApp } from "./app"
import { DocsController, PostsController } from "./controllers"
import { OpenApiDoc, Posts, CreatePost } from "./domain"
import { OpenApiYamlFile, MongoPostsService } from "./service"

async function main() {
  const openApiDocPath = path.join(
    path.dirname(""),
    "/docs/api/v0/openapi.yaml"
  )
  const docsService = new OpenApiYamlFile(openApiDocPath)
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

  const postsService = new MongoPostsService(db.collection("posts"))

  const posts = new Posts(postsService)
  const createPosts = new CreatePost(postsService)
  const postsController = new PostsController(posts, createPosts)
  const postsRouter = new PostsRouter(postsController)

  const versionZeroRouter = new RouterComposite("/v0")
  versionZeroRouter.addRouter(docsRouter)
  versionZeroRouter.addRouter(postsRouter)
  const apiRouter = new RouterComposite("/api")

  apiRouter.addRouter(versionZeroRouter)
  const webApp = new WebApp({ port: appConfig.getPort() }, apiRouter)
  webApp.start()
}

main()
