import UserError from "./user-error"

class User {
  constructor(name, email, encryptedPassword, salt) {
    this.name = name
    this.email = email
    this.encryptedPassword = encryptedPassword
    this.salt = salt
  }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email
  }

  getEncryptedPassword() {
    return this.encryptedPassword
  }

  getSalt() {
    return this.salt
  }

  equals(other) {
    let areValueObjTheSame = []
    areValueObjTheSame.push(this.getName().equals(other.getName()))
    areValueObjTheSame.push(this.getEmail().equals(other.getEmail()))
    areValueObjTheSame.push(
      this.getEncryptedPassword().equals(other.getEncryptedPassword())
    )
    areValueObjTheSame.push(this.getSalt().equals(other.getSalt()))

    return areValueObjTheSame.every((isTheSame) => isTheSame)
  }

  static create(name, email, encryptedPassword, salt) {
    if (name === null || name === undefined) {
      throw new UserError("User name is null/undefined")
    }
    if (email === null || email === undefined) {
      throw new UserError("User email is null/undefined")
    }
    if (encryptedPassword === null || encryptedPassword === undefined) {
      throw new UserError("User encrypted password is null/undefined")
    }
    if (salt === null || salt === undefined) {
      throw new UserError("User salt is null/undefined")
    }

    return new User(name, email, encryptedPassword, salt)
  }
}

export default User
