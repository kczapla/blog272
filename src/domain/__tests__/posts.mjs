import Posts from "../posts"

describe("Posts", () => {
  it("throws an error", async () => {
    const postsService = {
      get: async () => {
        return {}
      },
    }
    const posts = new Posts(postsService)

    try {
      await posts.get(1)
    } catch (error) {
      expect(error).toMatch("No post with id = 1")
    }
  })

  it("returns post", async () => {
    const postsService = {
      get: async () => {
        return { title: "carcetti" }
      },
    }
    const posts = new Posts(postsService)
    const post = await posts.get(1)

    expect(post).toMatchObject({ title: "carcetti" })
  })
})
