import { InvalidUserData } from "./user-errors"

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
      throw new InvalidUserData("Password is null.")
    }
    if (password === undefined) {
      throw new InvalidUserData("Password is undefined.")
    }
    if (password.length < 8) {
      throw new InvalidUserData(
        "Password is to short. Min length is 8 characters."
      )
    }
    if (100 < password.length) {
      throw new InvalidUserData(
        "Password it too long. Max length is 100 characters."
      )
    }

    return new Password(password)
  }
}

export default Password
