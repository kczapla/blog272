import Email from "../email"
import UserError from "../user-error"

describe("Email", () => {
  describe("create function", () => {
    it("throws when email length is below five", () => {
      expect(() => Email.create("aaa")).toThrow(UserError)
    })
    it("throws when email lenght is above 350", () => {
      expect(() => Email.create("a".repeat(351))).toThrow(UserError)
    })
    it("throws when email is null", () => {
      expect(() => Email.create(null)).toThrow(UserError)
    })
    it("throws when email is undefined", () => {
      expect(() => Email.create(undefined)).toThrow(UserError)
    })
  })
  describe("equals function", () => {
    it("returns true if comparing the same objects", () => {
      const e = Email.create("bob@bob.com")
      expect(e.equals(e)).toBeTruthy()
    })
  })
})
