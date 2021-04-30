import path from "path"

import api from "./api"
import { WebApp } from "./web/app"
import { DocsController } from "./controllers"
import { OpenApiDoc } from "./domain"
import { OpenApiYamlFile } from "./service"

const openApiDocPath = path.join(path.dirname(""), "/docs/api/v0/openapi.yaml")
const docsService = new OpenApiYamlFile(openApiDocPath)
const docs = new OpenApiDoc(docsService)

const docsController = new DocsController(docs)
const url = "http://localhost:3000/api/v0/docs"
const docsRouter = new api.DocsRouter(docsController, url)

const versionZeroRouter = new api.RouterComposite("/v0")
versionZeroRouter.addRouter(docsRouter)
const apiRouter = new api.RouterComposite("/api")

apiRouter.addRouter(versionZeroRouter)
const webApp = new WebApp({ port: 3000 }, apiRouter)
webApp.start()
