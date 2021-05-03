import path from "path"

import mongodb from "mongodb"
const { MongoClient } = mongodb

import { mongoDbConfig } from "./config"
import { DocsRouter, PostsRouter, RouterComposite } from "./api"
import { WebApp } from "./app"
import { DocsController, PostsController } from "./controllers"
import { OpenApiDoc, Posts } from "./domain"
import { OpenApiYamlFile, MongoPostsService } from "./service"

async function main() {
  const openApiDocPath = path.join(
    path.dirname(""),
    "/docs/api/v0/openapi.yaml"
  )
  const docsService = new OpenApiYamlFile(openApiDocPath)
  const docs = new OpenApiDoc(docsService)

  const docsController = new DocsController(docs)
  const url = "http://localhost:5000/api/v0/docs"
  const docsRouter = new DocsRouter(docsController, url)

  const client = new MongoClient(
    mongoDbConfig.getUri(),
    mongoDbConfig.getConnectionOptions()
  )

  await client.connect()
  await client.db("admin").command({ ping: 1 })
  const db = client.db("blog")

  const postsService = new MongoPostsService(db.collection("posts"))

  const posts = new Posts(postsService)
  const postsController = new PostsController(posts)
  const postsRouter = new PostsRouter(postsController)

  const versionZeroRouter = new RouterComposite("/v0")
  versionZeroRouter.addRouter(docsRouter)
  versionZeroRouter.addRouter(postsRouter)
  const apiRouter = new RouterComposite("/api")

  apiRouter.addRouter(versionZeroRouter)
  const webApp = new WebApp({ port: 5000 }, apiRouter)
  webApp.start()
}

main()
