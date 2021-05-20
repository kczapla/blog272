import UserError from "./user-error"

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
      throw new UserError("Hash value is null.")
    }
    if (hash === undefined) {
      throw new UserError("Hash value is undefined.")
    }
    if (hash === "") {
      throw new UserError("Hash is empty.")
    }

    return new EncryptedPassword(hash)
  }
}

export default EncryptedPassword
