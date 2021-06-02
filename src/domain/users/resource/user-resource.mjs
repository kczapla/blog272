import Router from "koa-router"
import {
  UserAlreadyExists,
  InvalidUserData,
} from "../use-cases/create-user/create-user-errors"

class UserResource {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }

  async createUser(ctx) {
    try {
      await this.createUserUseCase.execute(ctx.request.body)
      ctx.status = 201
    } catch (e) {
      ctx.body = { message: e.message }
      if (e instanceof UserAlreadyExists) {
        ctx.status = 409
      } else if (e instanceof InvalidUserData) {
        ctx.status = 400
      } else {
        ctx.status = 500
      }
    }
  }

  getRoutes() {
    const router = new Router()
    router.post("/users", async (ctx) => {
      console.log("calling create user from controller")
      await this.createUser(ctx)
    })
    return router.routes()
  }
}

export default UserResource
