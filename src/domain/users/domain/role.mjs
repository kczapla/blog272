import UserError from "./user-error"

class Role {
  constructor(role) {
    this.role = role
  }

  getValue() {
    return this.role
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(role) {
    if (role === null) {
      throw new UserError("Role value is null.")
    }
    if (role === undefined) {
      throw new UserError("Role value is undefined.")
    }
    if (role === "") {
      throw new UserError("Role is empty.")
    }

    return new Role(role)
  }
}

export default Role
