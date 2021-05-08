import Router from "koa-router"

class PostsRouter {
  constructor(postsController) {
    this.postsController = postsController
  }

  getRoutes() {
    const router = new Router()
    router.get("/posts/:id", async (ctx, next) => {
      await this.postsController.read(ctx)
      await next()
    })
    router.post("/posts", async (ctx, next) => {
      await this.postsController.create(ctx)
      await next()
    })

    return router.routes()
  }
}

export default PostsRouter
