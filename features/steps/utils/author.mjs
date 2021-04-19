import { login } from "./api/auth"
import { create, update } from "./api/posts"

class Author {
  constructor(name, email, password) {
    this.id = Math.floor(Math.random() * 1000)
    this.name = name
    this.email = email
    this.password = password
    this.jwtToken = ""
  }

  async login() {
    this.jwtToken = await login(this.email, this.password)
  }

  writePost(template) {
    return template(this.id, this.name)
  }

  async publishPost(requestBody) {
    return await create(requestBody, this.jwtToken)
  }

  async updatePost(postId, requestBody) {
    return await update(postId, requestBody, this.jwtToken)
  }

  async updatePostProperty(postId, requestBody) {
    return await patch(postId, requestBody, this.jwtToken)
  }
}

export default Author
