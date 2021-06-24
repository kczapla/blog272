class JWTAuthenticationMiddleware {
  constructor(tokenAuthenticationService) {
    this.tokenAuthenticationService = tokenAuthenticationService
  }

  authenticate(ctx, next) {
    const authHeader = ctx.request.headers["authorization"]
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
      const tokenPayload = this.tokenAuthenticationService.getUserFromToken(
        jwtToken
      )
      ctx.state = { user: { id: tokenPayload.id } }
    } catch (e) {
      ctx.status = 401
      ctx.body = { message: "Invalid token." }
      return
    }

    return next(ctx)
  }
}

export default JWTAuthenticationMiddleware
