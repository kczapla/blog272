import Salt from "../salt"
import Email from "../email"
import EncryptedPassword from "../encrypted-password"
import User from "../user"

describe("User", () => {
  describe("equals function", () => {
    it("returns true when comparing to the same user", () => {
      const email = Email.create("bob@bob.com")
      const password = EncryptedPassword.create("encpasswd")
      const salt = Salt.create("salt")

      const user = User.create(email, password, salt)

      expect(user.equals(user)).toBeTruthy()
    })
    it("returns true when comparing to the different user", () => {
      const bobemail = Email.create("bob@bob.com")
      const bobpassword = EncryptedPassword.create("encpasswd")
      const bobsalt = Salt.create("salt")
      const bob = User.create(bobemail, bobpassword, bobsalt)

      const markemail = Email.create("mark@bob.com")
      const markpassword = EncryptedPassword.create("encpasswd")
      const marksalt = Salt.create("salt")
      const mark = User.create(markemail, markpassword, marksalt)

      expect(bob.equals(mark)).toBeFalsy()
    })
  })
})
