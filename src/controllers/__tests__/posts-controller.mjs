import PostsController from "../posts-controller"

import { createContext, createResponseBody } from "./posts.utils"

describe("PostsController", () => {
  it("read returns 404", async () => {
    const posts = {
      get: async () => {
        throw "post does not exist"
      },
    }
    const postsController = new PostsController(posts)
    const context = {
      request: {
        params: {
          id: 1,
        },
      },
      response: {
        body: {},
        status: 0,
      },
    }
    await postsController.read(context, async () => {})
    expect(context.response.status).toEqual(404)
  })
  it("read returns 200", async () => {
    const posts = {
      get: async () => {
        return {}
      },
    }
    const postsController = new PostsController(posts)
    const context = {
      request: {
        params: {
          id: 1,
        },
      },
      response: {
        body: {},
        status: 0,
      },
    }
    await postsController.read(context, async () => {})
    expect(context.response.status).toEqual(200)
  })
  it("create returns post in context body", async () => {
    const createPost = {
      create: async () => {
        return createResponseBody()
      },
    }
    const postsController = new PostsController({}, createPost)
    const context = createContext()

    await postsController.create(context, async () => {})

    expect(context.response.body).toMatchObject(createResponseBody())
  })
})
