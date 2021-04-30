import Router from "koa-router"

class PostsRouter {
  constructor(postsController) {
    this.postsController = postsController
  }

  getRoutes() {
    const router = new Router()
    router.get("/posts/:id", (ctx, next) =>
      this.postsController.read(ctx, next)
    )

    return router.routes()
  }
}

export default PostsRouter
