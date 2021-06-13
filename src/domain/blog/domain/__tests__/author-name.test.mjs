import AuthorName from "../author-name"
import InvalidPostDataError from "../invalid-post-data-error"

describe("Author create", () => {
  it.each([undefined, null, "a", "a".repeat(33)])(
    "throws an error if input param is invalid",
    (p) => {
      expect(() => AuthorName.create(p)).toThrow(InvalidPostDataError)
    }
  )
  it("makes new AuthorName object", () => {
    const authorName = AuthorName.create("author")
    expect(authorName.getValue()).toMatch("author")
  })
})
describe("Author equals", () => {
  it("returns true when compering to the same author's name", () => {
    const authorName = AuthorName.create("author")
    expect(authorName.equals(authorName)).toBeTruthy()
  })
  it("returns false when compering to different author's name", () => {
    const authorName1 = AuthorName.create("author1")
    const authorName2 = AuthorName.create("author2")
    expect(authorName1.equals(authorName2)).toBeFalsy()
  })
})
