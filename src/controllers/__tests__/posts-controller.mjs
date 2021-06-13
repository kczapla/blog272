import PostsController from "../posts-controller"

import { createContext } from "./posts.utils"

describe("PostsController", () => {
  it("read returns 404", async () => {
    const posts = {
      read: async () => {
        return null
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
    await postsController.read(context)
    expect(context.response.status).toEqual(404)
  })
  it("read returns 200", async () => {
    const posts = {
      read: async () => {
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
    await postsController.read(context)
    expect(context.response.status).toEqual(200)
  })
})

describe("PostController.create", () => {
  test.each(["title", "author", "content"])(
    "returns an error when required property in postRequestBody is missing",
    async () => {
      const postController = new PostsController({}, {})
      const context = createContext()
      delete context.request.body["title"]

      await postController.create(context, async () => {})

      expect(context.response.body).toMatchObject({
        code: /\d+/,
        message: /.*/,
      })
      expect(context.response.status).toEqual(400)
    }
  )
})

describe("PostController delete", () => {
  it("returns 404 if given post does not exist", async () => {
    const readPost = {
      read: async () => {
        return null
      },
    }
    const deletePost = {
      delete: async () => {
        throw "post does not exist"
      },
    }
    const postController = new PostsController(readPost, {}, deletePost)
    const context = createContext()

    await postController.delete(context)

    expect(context.response.status).toEqual(404)
    expect(context.response.body).toMatchObject({
      code: /\d+/,
      message: /.*/,
    })
  })

  it("returns 400 if given post identifies is not int", async () => {
    const postController = new PostsController()

    let context = createContext()
    context.request.params.id = 1

    await postController.delete(context)

    expect(context.response.status).toEqual(400)
  })
})
