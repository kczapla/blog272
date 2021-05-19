import Salt from "../salt"
import { InvalidUserData } from "../user-errors"

describe("encrypted password", () => {
  describe("create function", () => {
    it.each([null, undefined, ""])(
      "throws an error if salt is invalid",
      (salt) => {
        expect(() => Salt.create(salt)).toThrow(InvalidUserData)
      }
    )
  })
  describe("equals function", () => {
    it("returns true when comparing to the same object", () => {
      const ep = Salt.create("salt")
      expect(ep.equals(ep)).toBeTruthy()
    })
    it("returns false when comparing different objects", () => {
      const ep1 = Salt.create("salt")
      const ep2 = Salt.create("salt1")
      expect(ep1.equals(ep2)).toBeFalsy()
    })
  })
})
