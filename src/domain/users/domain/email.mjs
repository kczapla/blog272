import UserError from "./user-error.mjs"

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
      throw new UserError("Email is null.")
    }
    if (email === undefined) {
      throw new UserError("Email is undefined.")
    }
    if (email.length < 5) {
      throw new UserError("Email length is below 5.")
    }
    if (email.length > 350) {
      throw new UserError("Email length is above 350.")
    }

    return new Email(email)
  }
}

export default Email
