import { Title } from "../"
import { InvalidPostDataError } from "../"

describe("Title", () => {
  it.each([undefined, null, "aa"])(
    "fails to create if input params are invalid",
    (p) => {
      expect(() => Title.create(p)).toThrow(InvalidPostDataError)
    }
  )
  it("create function creates title", () => {
    const title = Title.create("title")
    expect(title.getValue()).toMatch("title")
  })
  it("equals to the same title", () => {
    const title = Title.create("title")
    expect(title.equals(title)).toBeTruthy()
  })
  it("differs with different title", () => {
    const title1 = Title.create("title1")
    const title2 = Title.create("title2")
    expect(title1.equals(title2)).toBeFalsy()
  })
})
