import Router from "koa-router"
import {
  UserAlreadyExists,
  InvalidUserData,
} from "../use-cases/create-user/create-user-errors"

class UserResource {
  constructor(
    createUserUseCase,
    deleteUserUseCase,
    tokenAuthenticationService
  ) {
    this.createUserUseCase = createUserUseCase
    this.deleteUserUseCase = deleteUserUseCase
    this.tokenAuthenticationService = tokenAuthenticationService
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

  async deleteUser(ctx) {
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
  }

  getRoutes() {
    const router = new Router()
    router.post("/users", async (ctx) => {
      await this.createUser(ctx)
    })
    router.delete("/users/:userId", async (ctx) => {
      await this.deleteUser(ctx)
    })
    return router.routes()
  }
}

export default UserResource
