import UserError from "./user-error"

class Name {
  constructor(name) {
    this.name = name
  }

  getValue() {
    return this.name
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(name) {
    if (name === null) {
      throw new UserError("Email is null.")
    }
    if (name === undefined) {
      throw new UserError("Email is undefined.")
    }
    if (name.length < 2) {
      throw new UserError("Name is too short. Min length is 2 characters.")
    }
    if (name.length > 32) {
      throw new UserError("Name is too long. Max length is 32 characters.")
    }

    if (!name.match(/^\w+$/)) {
      throw new UserError("Only alphanumeric values are allowed in name.")
    }

    return new Name(name)
  }
}

export default Name
