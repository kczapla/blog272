import Router from "koa-router"

class PostsRouter {
  constructor(postsController) {
    this.postsController = postsController
  }

  getRoutes() {
    const router = new Router()
    router.post("/posts", async (ctx, next) => {
      await this.postsController.create(ctx)
      await next()
    })
    router.delete("/posts/:id", async (ctx, next) => {
      await this.postsController.delete(ctx)
      await next()
    })

    return router.routes()
  }
}

export default PostsRouter
