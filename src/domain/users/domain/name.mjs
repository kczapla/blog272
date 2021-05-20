import { InvalidUserData } from "./user-errors"

class Name {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }

  equals(other) {
    return this.getName() === other.getName()
  }

  static create(name) {
    if (name === null) {
      throw new InvalidUserData("Email is null.")
    }
    if (name === undefined) {
      throw new InvalidUserData("Email is undefined.")
    }
    if (name.length < 2) {
      throw new InvalidUserData(
        "Name is too short. Min length is 2 characters."
      )
    }
    if (name.length > 32) {
      throw new InvalidUserData(
        "Name is too long. Max length is 32 characters."
      )
    }

    if (!name.match(/^\w+$/)) {
      throw new InvalidUserData("Only alphanumeric values are allowed in name.")
    }

    return new Name(name)
  }
}

export default Name
