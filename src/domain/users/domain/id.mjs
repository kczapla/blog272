import UserError from "./user-error"

class Id {
  constructor(id) {
    this.id = id
  }

  equals(other) {
    return this.id === other.id
  }

  static create(id) {
    if (id === null) {
      throw new UserError("Id value is null.")
    }
    if (id === undefined) {
      throw new UserError("Id value is undefined.")
    }
    if (id === "") {
      throw new UserError("Id is empty.")
    }
    return new Id(id)
  }
}

export default Id
