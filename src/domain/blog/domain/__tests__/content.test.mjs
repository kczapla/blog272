import Content from "../content"
import InvalidPostDataError from "../invalid-post-data-error"

describe("Content", () => {
  it.each([undefined, null, "a".repeat(49), "a".repeat(10001)])(
    "fails to create if input params are invalid",
    (p) => {
      expect(() => Content.create(p)).toThrow(InvalidPostDataError)
    }
  )
  it("create function creates title", () => {
    const content = Content.create("a".repeat(4000))
    expect(content.getValue()).toMatch("a".repeat(4000))
  })
  it("equals to the same title", () => {
    const content = Content.create("a".repeat(4000))
    expect(content.equals(content)).toBeTruthy()
  })
  it("differs with different title", () => {
    const content1 = Content.create("a".repeat(4000))
    const content2 = Content.create("b".repeat(4000))
    expect(content1.equals(content2)).toBeFalsy()
  })
})
