import { Validator } from "jsonschema"
import { createErrorResponseBody } from "./error-response-body"
import {
  postRequestBodySchema,
  authorSchema,
} from "./posts-request-body-schema"

import { CreatePostRequestBody } from "../domain"

class PostsController {
  constructor(readPost, createPost, deletePost) {
    this.readPost = readPost
    this.createPost = createPost
    this.deletePost = deletePost
  }

  async read(ctx) {
    const id = ctx.request.params.id

    try {
      ctx.body = await this.readPost.read(id)
      ctx.response.status = 200
    } catch (error) {
      ctx.body = createErrorResponseBody(1, error)
      ctx.response.status = 404
    }
  }

  async create(ctx) {
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

    const createPostRequestBody = new CreatePostRequestBody(postRequestBody)

    try {
      const post = await this.createPost.create(createPostRequestBody)
      ctx.response.body = post
      ctx.response.status = 201
    } catch (error) {
      ctx.response.body = createErrorResponseBody(1, error)
      ctx.response.status = 400
    }
  }

  async delete(ctx) {
    const id = ctx.request.params.id

    if (typeof id !== "string") {
      ctx.response.status = 400
      ctx.response.body = createErrorResponseBody(
        1,
        "Wrong id type, expected string."
      )
      return
    }

    try {
      await this.deletePost.delete(id)
      ctx.response.status = 204
    } catch (error) {
      ctx.response.status = 404
      ctx.response.body = createErrorResponseBody(1, error)
    }
  }
}

export default PostsController
