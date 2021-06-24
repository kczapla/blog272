import Router from "koa-router"
import { RBACAuthorizationService } from "../application/"
import {
  UserAlreadyExists,
  InvalidUserData,
  UserUnauthorized,
  InvalidUserCredentails,
} from "../application/errors"

class UserResource {
  constructor(
    createUserUseCase,
    deleteUserUseCase,
    tokenAuthenticationService,
    loginUserUseCase,
    userRepository,
    authenticationMiddleware
  ) {
    this.createUserUseCase = createUserUseCase
    this.deleteUserUseCase = deleteUserUseCase
    this.tokenAuthenticationService = tokenAuthenticationService
    this.loginUserUseCase = loginUserUseCase
    this.userRepository = userRepository
    this.authenticationMiddleware = authenticationMiddleware
  }

  async loginUser(ctx) {
    try {
      const token = await this.loginUserUseCase.execute(ctx.request.body)
      ctx.body = token
      ctx.status = 201
    } catch (e) {
      ctx.body = { message: e.message }
      if (e instanceof UserUnauthorized) {
        ctx.status = 401
      } else if (e instanceof InvalidUserCredentails) {
        ctx.status = 400
      } else {
        ctx.status = 500
      }
    }
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
    const authorizationService = new RBACAuthorizationService(
      ctx.state.user.id,
      this.userRepository
    )

    const isAuthorized = await authorizationService.can("user:delete", {
      requesterId: ctx.state.user.id,
      userId: ctx.request.params.userId,
    })

    if (!isAuthorized) {
      ctx.status = 403
      ctx.body = {
        message: "User is not authorized to perform this operation",
      }
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
    router.delete(
      "/users/:userId",
      (ctx, next) => this.authenticationMiddleware.authenticate(ctx, next),
      async (ctx) => {
        await this.deleteUser(ctx)
      }
    )
    router.post("/login", async (ctx) => {
      await this.loginUser(ctx)
    })
    return router.routes()
  }
}

export default UserResource
