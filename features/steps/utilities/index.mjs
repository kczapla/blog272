import jwt from "jsonwebtoken"

export const getUserIdFromJWTToken = (token) => {
  return jwt.decode(token).id
}
