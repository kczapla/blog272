import PostsController from "../posts-controller"

describe("PostsController", () => {
  it("returns 404", async () => {
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
  it("returns 200", async () => {
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
})
