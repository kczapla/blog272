import Posts from "../posts"

describe("Posts", () => {
  it("thorws an error", () => {
    const postsService = {
      get: () => {
        return {}
      },
    }
    const posts = new Posts(postsService)

    expect(() => posts.get(1)).toThrow()
  })

  it("returns post", () => {
    const postsService = {
      get: () => {
        return { title: "carcetti" }
      },
    }
    const posts = new Posts(postsService)

    expect(posts.get(1)).toMatchObject({ title: "carcetti" })
  })
})
