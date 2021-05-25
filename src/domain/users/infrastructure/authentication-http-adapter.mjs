import Router from "koa-router"
import {
  UserUnauthorized,
  InvalidUserCredentails,
} from "../use-cases/get-authentication-token-use-case/get-authentication-token-use-case-errors"

class AuthenticationHttpAdapter {
  constructor(loginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase
  }

  getRoutes() {
    const router = new Router()
    router.post("/login", async (ctx) => {
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
    })
    return router.routes()
  }
}

export default AuthenticationHttpAdapter
