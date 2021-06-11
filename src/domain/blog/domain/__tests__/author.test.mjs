import Id from "../id"
import Author from "../author"
import AuthorName from "../author-name"
import InvalidPostDataError from "../invalid-post-data-error"

describe("Author create", () => {
  it("makes new object", () => {
    const author = Author.create(Id.create("1234"), AuthorName.create("name"))
    expect(author.getId().getValue()).toEqual("1234")
  })
  it.each([null, undefined])(
    "throws an error if author's id is invalid",
    (p) => {
      expect(() => Author.create(p, AuthorName.create("author"))).toThrow(
        InvalidPostDataError
      )
    }
  )
  it.each([null, undefined])(
    "throws an error if author's name is invalid",
    (p) => {
      expect(() => Author.create(Id.create("111111"), p)).toThrow(
        InvalidPostDataError
      )
    }
  )
})
;("")
