import { InvalidUserData } from "./user-errors.mjs"

class Email {
  constructor(email) {
    this.email = email
  }

  getValue() {
    return this.email
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(email) {
    if (email === null) {
      throw new InvalidUserData("Email is null.")
    }
    if (email === undefined) {
      throw new InvalidUserData("Email is undefined.")
    }
    if (email.length < 5) {
      throw new InvalidUserData("Email length is below 5.")
    }
    if (email.length > 350) {
      throw new InvalidUserData("Email length is above 350.")
    }

    return new Email(email)
  }
}

export default Email
