import { InvalidUserData } from "./user-errors"

class EncryptedPassword {
  constructor(hash) {
    this.hash = hash
  }

  getValue() {
    return this.hash
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(hash) {
    if (hash === null) {
      throw new InvalidUserData("Hash value is null.")
    }
    if (hash === undefined) {
      throw new InvalidUserData("Hash value is undefined.")
    }
    if (hash === "") {
      throw new InvalidUserData("Hash is empty.")
    }

    return new EncryptedPassword(hash)
  }
}

export default EncryptedPassword
