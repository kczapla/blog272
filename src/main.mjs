import path from "path"

import { DocsRouter, RouterComposite } from "./api"
import { WebApp } from "./app"
import { DocsController } from "./controllers"
import { OpenApiDoc } from "./domain"
import { OpenApiYamlFile } from "./service"

const openApiDocPath = path.join(path.dirname(""), "/docs/api/v0/openapi.yaml")
const docsService = new OpenApiYamlFile(openApiDocPath)
const docs = new OpenApiDoc(docsService)

const docsController = new DocsController(docs)
const url = "http://localhost:3000/api/v0/docs"
const docsRouter = new DocsRouter(docsController, url)

const versionZeroRouter = new RouterComposite("/v0")
versionZeroRouter.addRouter(docsRouter)
const apiRouter = new RouterComposite("/api")

apiRouter.addRouter(versionZeroRouter)
const webApp = new WebApp({ port: 3000 }, apiRouter)
webApp.start()
