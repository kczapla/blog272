import Id from "../id"
import Name from "../name"
import Salt from "../salt"
import Email from "../email"
import EncryptedPassword from "../encrypted-password"
import User from "../user"

describe("User", () => {
  describe("equals function", () => {
    it("returns true when comparing to the same user", () => {
      const id = Id.create("1111")
      const name = Name.create("bob")
      const email = Email.create("bob@bob.com")
      const password = EncryptedPassword.create("encpasswd")
      const salt = Salt.create("salt")

      const user = User.create(id, name, email, password, salt)

      expect(user.equals(user)).toBeTruthy()
    })
    it("returns true when comparing to the different user", () => {
      const bobid = Id.create("1111")
      const bobname = Name.create("bob")
      const bobemail = Email.create("bob@bob.com")
      const bobpassword = EncryptedPassword.create("encpasswd")
      const bobsalt = Salt.create("salt")
      const bob = User.create(bobid, bobname, bobemail, bobpassword, bobsalt)

      const markid = Id.create("2222")
      const markname = Name.create("mark")
      const markemail = Email.create("mark@bob.com")
      const markpassword = EncryptedPassword.create("encpasswd")
      const marksalt = Salt.create("salt")
      const mark = User.create(
        markid,
        markname,
        markemail,
        markpassword,
        marksalt
      )

      expect(bob.equals(mark)).toBeFalsy()
    })
  })
})
