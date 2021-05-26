import Router from "koa-router"

class DeleteUserHttpAdapter {
  constructor(deleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase
  }

  getRoutes() {
    const router = new Router()
    router.delete("/users/:userId", async (ctx) => {
      try {
        await this.deleteUserUseCase.execute(ctx.request.params.userId)
        ctx.status = 200
      } catch (e) {
        ctx.body = { message: e.message }
        ctx.status = 500
      }
    })
    return router.routes()
  }
}

export default DeleteUserHttpAdapter
