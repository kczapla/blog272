import Router from "koa-router"

class DocsResource {
  constructor(readDocsService) {
    this.readDocsService = readDocsService
  }

  async readApiDoc(ctx) {
    try {
      ctx.status = 200
      ctx.body = await this.readDocsService.readApiDoc()
    } catch (e) {
      ctx.status = 500
      ctx.body = {
        message: e.message,
      }
    }
  }

  getRoutes() {
    const router = new Router()
    router.get("/docs", async (ctx) => {
      await this.readApiDoc(ctx)
    })

    return router.routes()
  }
}

export default DocsResource
