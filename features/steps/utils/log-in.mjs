import { login } from "./api/auth"

export const asBob = async () => {
  return await login("bob@myblog.com", "bobpasswd")
}

export const asMark = async () => {
  return await login("mark@myblog.com", "markpasswd")
}

export default { asBob, asMark }
