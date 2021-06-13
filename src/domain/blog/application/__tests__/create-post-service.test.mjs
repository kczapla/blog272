import CratePostService from "../create-post-service"
import blogAppErrors from "../blog-application-errors"

describe("create post service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const postRepository = {
    nextIdentity: jest.fn(),
    save: jest.fn(),
  }
  it("creates new post", async () => {
    postRepository.nextIdentity.mockReturnValue("1")
    const createPostService = new CratePostService(postRepository)
    const createPostDto = {
      title: "test",
      tags: [],
      author: { id: "1", name: "test" },
      content: "a".repeat(100),
    }
    await expect(createPostService.create(createPostDto)).resolves.not.toThrow()
  })
  it("throws an error when post dto is invalid", async () => {
    postRepository.nextIdentity.mockReturnValue("1")
    const createPostService = new CratePostService(postRepository)
    const createPostDto = {
      title: "test",
      tags: [],
      author: { id: "1", name: "test" },
      content: "a".repeat(10),
    }
    await expect(createPostService.create(createPostDto)).rejects.toThrow(
      blogAppErrors.InvalidPostData
    )
  })
})
