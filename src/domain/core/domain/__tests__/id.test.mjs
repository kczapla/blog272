import Id from "../id"
import CoreDomainError from "../core-domain-error"

describe("user id", () => {
  describe("create function", () => {
    it.each([null, undefined, ""])("throws an error if id is invalid", (id) => {
      expect(() => Id.create(id)).toThrow(CoreDomainError)
    })
  })
  describe("equals function", () => {
    it("returns true if comparing the same ids", () => {
      const id = Id.create("1111")
      expect(id.equals(id)).toBeTruthy()
    })
    it("returns false if comparing different ids", () => {
      const id1 = Id.create("1111")
      const id2 = Id.create("2222")
      expect(id1.equals(id2)).toBeFalsy()
    })
  })
})
