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

  async readPost(ctx) {
    const postId = ctx.request.params.postId
    try {
      ctx.body = await this.readPostService.read({ postId: postId })
      ctx.status = 200
    } catch (e) {
      ctx.body = { message: e.message, code: 1 }
      if (e instanceof blogApplicationErrors.PostNotFound) {
        ctx.status = 404
      } else if (e instanceof blogApplicationErrors.InvalidPostData) {
        ctx.status = 400
      } else {
        ctx.status = 500
      }
    }
  }

  getRoutes() {
    const router = new Router()
    router.post("/posts", async (ctx) => {
      await this.createPost(ctx)
    })
    router.get("/posts/:postId", async (ctx) => {
      await this.readPost(ctx)
    })

    return router.routes()
  }
}

export default BlogResource
