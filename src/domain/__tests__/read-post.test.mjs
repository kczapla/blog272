import ReadPost from "../read-post"
import Post from "../post"

describe("ReadPost", () => {
  it("returns Post object", () => {
    const postService = {
      read: async () => {
        return { id: 1 }
      },
    }

    const readPost = new ReadPost(postService)

    expect(readPost.read(1)).resolves.toBeInstanceOf(Post)
  })
  it("returns null", () => {
    const postService = {
      read: async () => {
        return {}
      },
    }

    const readPost = new ReadPost(postService)

    expect(readPost.read(1)).resolves.toBeFalsy()
  })
})
