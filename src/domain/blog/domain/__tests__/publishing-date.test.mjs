import PublishingDate from "../publishing-date"
import InvalidPostDataError from "../invalid-post-data-error"

describe("PublishingDate create", () => {
  describe("create function", () => {
    it.each([null, undefined])(
      "throws an error if input param is invalid",
      (p) => {
        expect(() => PublishingDate.create(p)).toThrow(InvalidPostDataError)
      }
    )
  })
  it("makes new object", () => {
    const publishingDate = PublishingDate.create(123456789)
    expect(publishingDate.getValue()).toEqual(123456789)
  })
})

describe("PublishingDate equals", () => {
  it("returns true when compering to the same publishing date", () => {
    const publishingDate = PublishingDate.create(1234)
    expect(publishingDate.equals(publishingDate)).toBeTruthy()
  })
  it("returns false when compering to the different publishing date", () => {
    const publishingDate1 = PublishingDate.create(12341)
    const publishingDate2 = PublishingDate.create(12342)
    expect(publishingDate1.equals(publishingDate2)).toBeFalsy()
  })
})
