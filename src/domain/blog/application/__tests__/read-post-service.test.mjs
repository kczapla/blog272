import ReadPostService from "../read-post-service"
import { Title } from "../../domain"
import blogErrors from "../blog-application-errors"

describe("ReadPostService findByTitle", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const postView = {
    findByTitle: jest.fn(),
  }
  it("returns post view", async () => {
    const title = Title.create("title")
    const post = { id: "asdfghjkl", title: title.getValue() }
    const findResult = [post]
    postView.findByTitle.mockReturnValue(findResult)
    const readPostService = new ReadPostService(postView)
    await expect(readPostService.findByTitle(title)).resolves.toEqual(post)
  })
  it("thorws if post does not exist", async () => {
    const title = Title.create("title")
    postView.findByTitle.mockReturnValue([])
    const readPostService = new ReadPostService(postView)
    await expect(readPostService.findByTitle(title)).rejects.toThrow(
      blogErrors.PostNotFound
    )
  })
})
