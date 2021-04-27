import api from "./api"
import { WebApp } from "./web/app"

const docsController = {
  raw: async (ctx, next) => {
    ctx.body = { docs: "this is raw doc" }
    await next()
  },

  ui: async (ctx, next) => {
    ctx.body = { docs: "this is pretty doc" }
    await next()
  },
}

const docsRouter = new api.DocsRouter(docsController)

const versionZeroRouter = new api.RouterComposite("/v0")
versionZeroRouter.addRouter(docsRouter)

const apiRouter = new api.RouterComposite("/api")
apiRouter.addRouter(versionZeroRouter)

const webApp = new WebApp({ port: 3000 }, apiRouter)
webApp.start()
