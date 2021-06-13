import Tag from "../tag"
import InvalidPostDataError from "../invalid-post-data-error"

describe("Tag create", () => {
  it.each([null, undefined])(
    "throws an error if input param is invalid",
    (p) => {
      expect(() => Tag.create(p)).toThrow(InvalidPostDataError)
    }
  )
  it("makes new object", () => {
    const tag = new Tag("tag")
    expect(tag.getValue()).toEqual("tag")
  })
})

describe("Tag equals", () => {
  it("returns true when compering to the same tag", () => {
    const tag = Tag.create("tag")
    expect(tag.equals(tag)).toBeTruthy()
  })
  it("returns false when compering to different tag", () => {
    const tag1 = Tag.create("tag1")
    const tag2 = Tag.create("tag2")
    expect(tag1.equals(tag2)).toBeFalsy()
  })
})
