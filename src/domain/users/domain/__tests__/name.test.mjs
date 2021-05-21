import Name from "../name"
import UserError from "../user-error"

describe("User Name", () => {
  describe("create function", () => {
    it.each([null, undefined, "n", "n".repeat(33), "ad@#$%"])(
      "throws if name is invalid",
      (name) => {
        expect(() => Name.create(name)).toThrow(UserError)
      }
    )
  })
  describe("equals function", () => {
    it("returns true if comparing to the same name", () => {
      const name = Name.create("bob")
      expect(name.equals(name)).toBeTruthy()
    })
    it("returns false if comparing to the different name", () => {
      const bob = Name.create("bob")
      const mark = Name.create("mark")
      expect(bob.equals(mark)).toBeFalsy()
    })
  })
})
