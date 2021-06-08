import Role from "../role"
import UserError from "../user-error"

describe("role", () => {
  describe("create function", () => {
    it.each([null, undefined, ""])(
      "throws an error if it is invalid",
      (role) => {
        expect(() => Role.create(role)).toThrow(UserError)
      }
    )
  })
  describe("equals function", () => {
    it("returns true when comparing to the same object", () => {
      const ep = Role.create("role")
      expect(ep.equals(ep)).toBeTruthy()
    })
    it("returns false when comparing different objects", () => {
      const ep1 = Role.create("role")
      const ep2 = Role.create("role1")
      expect(ep1.equals(ep2)).toBeFalsy()
    })
  })
})
