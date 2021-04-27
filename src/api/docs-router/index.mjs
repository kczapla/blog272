import Router from "koa-router"

class DocsRouter {
  constructor(docsController) {
    this.docsController = docsController
  }

  getRoutes() {
    const router = new Router()
    router.get("/docs", this.docsController.raw)
    router.get("/docs-ui", this.docsController.ui)

    return router.routes()
  }
}

export default DocsRouter
