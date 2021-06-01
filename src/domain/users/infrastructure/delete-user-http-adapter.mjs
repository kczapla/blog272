import Router from "koa-router"

class DeleteUserHttpAdapter {
  constructor(deleteUserUseCase, tokenAuthenticationService) {
    this.deleteUserUseCase = deleteUserUseCase
    this.tokenAuthenticationService = tokenAuthenticationService
  }

  getRoutes() {
    const router = new Router()
    router.delete("/users/:userId", async (ctx) => {
      const authHeader = ctx.request.headers["authentication"]
      if (authHeader === null || authHeader === undefined) {
        ctx.status = 400
        ctx.body = { message: "JWT token is missing." }
        return
      }
      if (!authHeader.startsWith("Bearer ")) {
        ctx.status = 400
        ctx.body = { message: "Invalid Authentication header format." }
        return
      }

      const jwtToken = authHeader.replace("Bearer ", "")

      try {
        this.tokenAuthenticationService.getUserFromToken(jwtToken)
      } catch (e) {
        ctx.status = 401
        ctx.body = { message: "Invalid token." }
        return
      }

      try {
        await this.deleteUserUseCase.execute({
          userId: ctx.request.params.userId,
        })
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
