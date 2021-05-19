import Password from "../password"
import { InvalidUserData } from "../user-errors"

describe("Password", () => {
  describe("create function", () => {
    it.each(["aaa", "a".repeat(101), null, undefined])(
      "throws InvalidUserData when password is too long",
      (password) => {
        expect(() => Password.create(password)).toThrow(InvalidUserData)
      }
    )
  })
  describe("equals function", () => {
    it("returns true when comparing to the same object", () => {
      const p = Password.create("Password")
      expect(p.equals(p)).toBeTruthy()
    })
    it("returns false when comparing different objects", () => {
      const p1 = Password.create("Password")
      const p2 = Password.create("Password1")
      expect(p1.equals(p2)).toBeFalsy()
    })
  })
})
