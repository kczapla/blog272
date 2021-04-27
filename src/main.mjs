import Router from "koa-router"
import { WebApp } from "./web/app"

const router = {
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

const webApp = new WebApp({ port: 3000 }, router)
webApp.start()
