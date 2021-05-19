import EncryptedPassword from "../encrypted-password"
import { InvalidUserData } from "../user-errors"

describe("encrypted password", () => {
  describe("create function", () => {
    it.each([null, undefined, ""])(
      "throws an error if hash is invalid",
      (hash) => {
        expect(() => EncryptedPassword.create(hash)).toThrow(InvalidUserData)
      }
    )
  })
  describe("equals function", () => {
    it("returns true when comparing to the same object", () => {
      const ep = EncryptedPassword.create("hash")
      expect(ep.equals(ep)).toBeTruthy()
    })
    it("returns false when comparing different objects", () => {
      const ep1 = EncryptedPassword.create("hash")
      const ep2 = EncryptedPassword.create("hash1")
      expect(ep1.equals(ep2)).toBeFalsy()
    })
  })
})
