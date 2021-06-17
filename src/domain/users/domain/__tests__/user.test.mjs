import { Id } from "../../../core/domain"
import Name from "../name"
import Salt from "../salt"
import Email from "../email"
import EncryptedPassword from "../encrypted-password"
import Role from "../role"
import User from "../user"

describe("User", () => {
  describe("equals function", () => {
    it("returns true when comparing to the same user", () => {
      const id = Id.create("1111")
      const name = Name.create("bob")
      const email = Email.create("bob@bob.com")
      const password = EncryptedPassword.create("encpasswd")
      const salt = Salt.create("salt")
      const role = Role.create("role")

      const user = User.create(id, name, email, password, salt, role)

      expect(user.equals(user)).toBeTruthy()
    })
    it("returns true when comparing to the different user", () => {
      const bobid = Id.create("1111")
      const bobname = Name.create("bob")
      const bobemail = Email.create("bob@bob.com")
      const bobpassword = EncryptedPassword.create("encpasswd")
      const bobsalt = Salt.create("salt")
      const bobrole = Role.create("role")
      const bob = User.create(
        bobid,
        bobname,
        bobemail,
        bobpassword,
        bobsalt,
        bobrole
      )

      const markid = Id.create("2222")
      const markname = Name.create("mark")
      const markemail = Email.create("mark@bob.com")
      const markpassword = EncryptedPassword.create("encpasswd")
      const marksalt = Salt.create("salt")
      const markrole = Role.create("role")

      const mark = User.create(
        markid,
        markname,
        markemail,
        markpassword,
        marksalt,
        markrole
      )

      expect(bob.equals(mark)).toBeFalsy()
    })
  })
})
