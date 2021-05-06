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
    router.post("/posts", (ctx, next) => {
      this.postsController.create(ctx, next)
    })

    return router.routes()
  }
}

export default PostsRouter
