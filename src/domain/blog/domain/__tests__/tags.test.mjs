import Tag from "../tag"
import Tags from "../tags"
import InvalidPostDataError from "../invalid-post-data-error"

describe("Tags create", () => {
  it("makes Tags object from a list of Tag objects", () => {
    const tags = Tags.create([Tag.create("tag1"), Tag.create("tag2")])
    expect(Array.from(tags, (x) => x.getValue())).toEqual(["tag1", "tag2"])
  })
  it("throws an error when list of tags is larger than 100", () => {
    const tags = Array(101).fill(Tag.create("tag"), 0, 101)
    expect(() => Tags.create(tags)).toThrow(InvalidPostDataError)
  })
  it.each([1, "test", null, undefined])(
    "throws an error if input is not an array",
    (p) => {
      expect(() => Tags.create(p)).toThrow(InvalidPostDataError)
    }
  )
  it("throws an error if items are not instances of Tag", () => {
    const tags = [1, "tag"]
    expect(() => Tags.create(tags)).toThrow(InvalidPostDataError)
  })
})

describe("Tags add", () => {
  it("adds Tag instance to the Tags collection", () => {
    const tags = Tags.create([])
    tags.add(Tag.create("tag"))
    tags.add(Tag.create("tag"))
    expect(Array.from(tags, (x) => x.getValue())).toEqual(["tag", "tag"])
  })
  it("throws error if parameter is not an instance of tag", () => {
    const tags = Tags.create([])
    expect(() => tags.add(1)).toThrow(InvalidPostDataError)
  })
  it("throws an error when number of tags in collection is above threshold", () => {
    const tagsContainer = Array(100).fill(Tag.create("tag"), 0, 100)
    const tagsCollection = Tags.create(tagsContainer)
    expect(() => tagsCollection.add(Tag.create("tag"))).toThrow(
      InvalidPostDataError
    )
  })
})
