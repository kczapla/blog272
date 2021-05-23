import UserError from "./user-error"

class User {
  constructor(id, name, email, encryptedPassword, salt) {
    this.id = id
    this.name = name
    this.email = email
    this.encryptedPassword = encryptedPassword
    this.salt = salt
  }

  getId() {
    return this.id
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
    areValueObjTheSame.push(this.getId().equals(other.getId()))
    areValueObjTheSame.push(this.getName().equals(other.getName()))
    areValueObjTheSame.push(this.getEmail().equals(other.getEmail()))
    areValueObjTheSame.push(
      this.getEncryptedPassword().equals(other.getEncryptedPassword())
    )
    areValueObjTheSame.push(this.getSalt().equals(other.getSalt()))

    return areValueObjTheSame.every((isTheSame) => isTheSame)
  }

  static create(id, name, email, encryptedPassword, salt) {
    if (id === null || id === undefined) {
      throw new UserError("User id is null/undefined")
    }
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

    return new User(id, name, email, encryptedPassword, salt)
  }
}

export default User
