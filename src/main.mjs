import Router from "koa-router"
import api from "./api"
import { WebApp } from "./web/app"

const postsRouter = {
  getRoutes: () => {
    const router = new Router({
      prefix: "/posts",
    })

    router.get("/", async (ctx, next) => {
      ctx.body = [
        { id: 1, name: "krzysztof", surname: "czapla" },
        { id: 2, name: "krzysztof", surname: "czapla" },
      ]
      await next()
    })

    return router.routes()
  },
}

const versionZeroRouter = new api.RouterComposite("/v0")
versionZeroRouter.addRouter(postsRouter)

const apiRouter = new api.RouterComposite("/api")
apiRouter.addRouter(versionZeroRouter)

const webApp = new WebApp({ port: 3000 }, apiRouter)
webApp.start()
