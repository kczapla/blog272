import Router from "koa-router"
import {
  UserAlreadyExists,
  InvalidUserData,
} from "../use-cases/create-user/create-user-errors"

class UsersHttpAdapter {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }

  getRoutes() {
    const router = new Router()
    router.post("/users", async (ctx) => {
      try {
        await this.createUserUseCase.execute(ctx.request, ctx.response)
        ctx.status = 201
      } catch (e) {
        ctx.body = e.message
        if (e instanceof UserAlreadyExists) {
          ctx.status = 409
        } else if (e instanceof InvalidUserData) {
          ctx.status = 400
        } else {
          ctx.status = 500
        }
      }
    })
    return router.routes()
  }
}

export default UsersHttpAdapter
