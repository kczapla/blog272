import { Validator } from "jsonschema"
import { createErrorResponseBody } from "./error-response-body"
import {
  postRequestBodySchema,
  authorSchema,
} from "./posts-request-body-schema"

class PostsController {
  constructor(posts, createPost) {
    this.posts = posts
    this.createPost = createPost
  }

  async read(ctx, next) {
    const id = ctx.request.params.id

    try {
      ctx.body = await this.posts.get(id)
      ctx.response.status = 200
    } catch (error) {
      ctx.body = error
      ctx.response.status = 404
    }
    await next()
  }

  async create(ctx, next) {
    const postRequestBody = ctx.request.body

    const validator = new Validator()
    validator.addSchema(authorSchema)
    const validationResult = validator.validate(
      postRequestBody,
      postRequestBodySchema
    )

    if (!validationResult.valid) {
      ctx.response.body = createErrorResponseBody(
        11,
        validationResult.toString()
      )
      ctx.response.status = 400
      return
    }

    try {
      const post = await this.createPost.create(postRequestBody)
      ctx.response.body = post
      ctx.response.status = 201
    } catch (error) {
      ctx.body = createErrorResponseBody(1, error)
      ctx.response.status = 400
    }
    await next()
  }
}

export default PostsController
