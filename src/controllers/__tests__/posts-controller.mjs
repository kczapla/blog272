import PostsController from "../posts-controller"

describe("PostsController", () => {
  it("returns 404", async () => {
    const posts = {
      get: () => {
        throw "post does not exist"
      },
    }
    const postsController = new PostsController(posts)
    const context = {
      request: {
        query: {
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
      get: () => {
        return {}
      },
    }
    const postsController = new PostsController(posts)
    const context = {
      request: {
        query: {
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
  it("returns 400", async () => {
    const posts = {}

    const postsController = new PostsController(posts)
    const context = {
      request: {
        query: {
          id: "ebe",
        },
      },
      response: {
        body: {},
        status: 0,
      },
    }
    await postsController.read(context, async () => {})
    expect(context.response.status).toEqual(400)
  })
})
