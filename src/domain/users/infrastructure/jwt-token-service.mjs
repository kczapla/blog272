import jwt from "jsonwebtoken"

class JWTTokenService {
  constructor(tokenDuration, secret) {
    this.secret = secret
    this.tokenDuration = tokenDuration
  }

  getUserFromToken(token) {
    return jwt.verify(token, this.secret)
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, this.secret, {
      expiresIn: this.tokenDuration,
    })
  }
}

export default JWTTokenService
