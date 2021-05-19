import Email from "../email"
import { InvalidUserData } from "../user-errors"

describe("Email", () => {
  describe("create function", () => {
    it("throws when email length is below five", () => {
      expect(() => Email.create("aaa")).toThrow(InvalidUserData)
    })
    it("throws when email lenght is above 350", () => {
      expect(() => Email.create("a".repeat(351))).toThrow(InvalidUserData)
    })
    it("throws when email is null", () => {
      expect(() => Email.create(null)).toThrow(InvalidUserData)
    })
    it("throws when email is undefined", () => {
      expect(() => Email.create(undefined)).toThrow(InvalidUserData)
    })
  })
  describe("equals function", () => {
    it("returns true if comparing the same objects", () => {
      const e = Email.create("bob@bob.com")
      expect(e.equals(e)).toBeTruthy()
    })
  })
})
