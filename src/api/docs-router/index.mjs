import Router from "koa-router"
import koa2SwaggerUi from "koa2-swagger-ui"

const { koaSwagger } = koa2SwaggerUi

class DocsRouter {
  constructor(docsController, parentUrl) {
    this.parentUrl = parentUrl
    this.docsController = docsController
  }

  getRoutes() {
    const router = new Router()
    router.get("/docs", (ctx, next) => this.docsController.raw(ctx, next))
    router.get(
      "/docs-ui",
      koaSwagger({
        routePrefix: false,
        swaggerOptions: { url: this.parentUrl },
      })
    )

    return router.routes()
  }
}

export default DocsRouter
