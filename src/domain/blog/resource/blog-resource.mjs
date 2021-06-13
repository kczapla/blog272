import Router from "koa-router"
import { blogApplicationErrors } from "../application"

class BlogResource {
  constructor(createPostService, readPostService) {
    this.createPostService = createPostService
    this.readPostService = readPostService
  }

  async createPost(ctx) {
    const createPostDto = ctx.request.body

    try {
      await this.createPostService.create(createPostDto)
      ctx.body = await this.readPostService.findByTitle(createPostDto.title)
      ctx.status = 201
    } catch (e) {
      console.log(e)
      ctx.response.body = { message: e.message }
      if (e instanceof blogApplicationErrors.InvalidPostData) {
        ctx.response.status = 400
      } else {
        ctx.response.status = 500
      }
    }
  }

  getRoutes() {
    const router = new Router()
    router.post("/posts", async (ctx) => {
      await this.createPost(ctx)
    })

    return router.routes()
  }
}

export default BlogResource
