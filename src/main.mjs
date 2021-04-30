import api from "./api"
import { WebApp } from "./web/app"
import { DocsController } from "./controllers"
import { OpenApiDoc } from "./domain"

const docsService = {
  getDocument: () => {
    return { docs: "this is raw doc" }
  },
}

const docs = new OpenApiDoc(docsService)

const url = "http://localhost:3000/api/v0/docs"
const docsController = new DocsController(docs, url)
const docsRouter = new api.DocsRouter(docsController)

const versionZeroRouter = new api.RouterComposite("/v0")
versionZeroRouter.addRouter(docsRouter)
const apiRouter = new api.RouterComposite("/api")

apiRouter.addRouter(versionZeroRouter)
const webApp = new WebApp({ port: 3000 }, apiRouter)
webApp.start()
