import Router from "koa-router"
import { blogApplicationErrors } from "../application"

class BlogResource {
  constructor(
    createPostService,
    deletePostService,
    readPostService,
    authenticationMiddleware,
    authorizationService
  ) {
    this.createPostService = createPostService
    this.deletePostService = deletePostService
    this.readPostService = readPostService
    this.authenticationMiddleware = authenticationMiddleware
    this.authorizationService = authorizationService
  }

  async createPost(ctx) {
    const createPostDto = ctx.request.body
    createPostDto.author.id = ctx.state.user.id

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

  async deletePost(ctx) {
    try {
      const canDo = await this.authorizationService.canUserDoActionOnPost(
        ctx.state.user.id,
        "post:delete",
        ctx.request.params.postId
      )

      if (!canDo) {
        ctx.status = 403
        ctx.body = {
          message: `User(id=${ctx.state.user.id}) is not authorized to delete Post(id=${ctx.request.params.postId})`,
          code: 1,
        }
        return
      }
    } catch (e) {
      ctx.status = 500
      ctx.body = { message: e.message, code: 1 }
      return
    }

    try {
      ctx.status = 200
      ctx.body = await this.deletePostService.delete(ctx.request.params)
    } catch (e) {
      if (e instanceof blogApplicationErrors.PostNotFound) {
        ctx.status = 404
      } else if (e instanceof blogApplicationErrors.InvalidPostData) {
        ctx.status = 400
      } else {
        ctx.status = 500
      }
      ctx.body = { message: e.message, code: 1 }
    }
  }

  getRoutes() {
    const router = new Router()
    router.post(
      "/posts",
      (ctx, next) => this.authenticationMiddleware.authenticate(ctx, next),
      async (ctx) => {
        await this.createPost(ctx)
      }
    )
    router.get("/posts/:postId", async (ctx) => {
      await this.readPost(ctx)
    })
    router.delete(
      "/posts/:postId",
      (ctx, next) => this.authenticationMiddleware.authenticate(ctx, next),
      async (ctx) => {
        await this.deletePost(ctx)
      }
    )

    return router.routes()
  }
}

export default BlogResource
