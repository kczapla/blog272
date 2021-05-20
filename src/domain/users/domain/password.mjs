import UserError from "./user-error"

class Password {
  constructor(password) {
    this.password = password
  }

  getValue() {
    return this.password
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(password) {
    if (password === null) {
      throw new UserError("Password is null.")
    }
    if (password === undefined) {
      throw new UserError("Password is undefined.")
    }
    if (password.length < 8) {
      throw new UserError("Password is to short. Min length is 8 characters.")
    }
    if (100 < password.length) {
      throw new UserError("Password it too long. Max length is 100 characters.")
    }

    return new Password(password)
  }
}

export default Password
