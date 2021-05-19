import { InvalidUserData } from "./user-errors"

class Salt {
  constructor(salt) {
    this.salt = salt
  }

  getValue() {
    return this.salt
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(salt) {
    if (salt === null) {
      throw new InvalidUserData("Salt value is null.")
    }
    if (salt === undefined) {
      throw new InvalidUserData("Salt value is undefined.")
    }
    if (salt === "") {
      throw new InvalidUserData("Salt is empty.")
    }

    return new Salt(salt)
  }
}

export default Salt
