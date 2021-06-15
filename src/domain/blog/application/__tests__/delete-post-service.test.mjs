import DeletePostService from "../delete-post-service"
import blogAppErrors from "../blog-application-errors"

describe("DeletePostService delete", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const postRepository = {
    exists: jest.fn(),
    delete: jest.fn(),
  }
  it("delete post with given id", async () => {
    postRepository.exists.mockReturnValue(true)
    const deletePostService = new DeletePostService(postRepository)
    const postId = "a".repeat(24)
    await deletePostService.delete({ postId: postId })
    expect(postRepository.delete).toHaveBeenCalled()
  })
  it.each([null, undefined])(
    "throws an error if post id is invalid",
    async (invalidPostId) => {
      const deletePostService = new DeletePostService(postRepository)
      await expect(
        deletePostService.delete({ postId: invalidPostId })
      ).rejects.toThrow(blogAppErrors.InvalidPostData)
    }
  )
  it("throws an error if post with give id does not exist", async () => {
    postRepository.exists.mockReturnValue(false)
    const deletePostService = new DeletePostService(postRepository)
    const postId = "a".repeat(24)
    await expect(deletePostService.delete({ postId: postId })).rejects.toThrow(
      blogAppErrors.PostNotFound
    )
  })
})
