import InvalidPostDataError from "./invalid-post-data-error"

class Id {
  constructor(id) {
    this.id = id
  }

  getValue() {
    return this.id
  }

  equals(other) {
    return this.id === other.id
  }

  static create(id) {
    if (typeof id !== "string") {
      throw new InvalidPostDataError("Id value must be a string")
    }
    if (id === null) {
      throw new InvalidPostDataError("Id value is null.")
    }
    if (id === undefined) {
      throw new InvalidPostDataError("Id value is undefined.")
    }
    if (id === "") {
      throw new InvalidPostDataError("Id is empty.")
    }
    return new Id(id)
  }
}

export default Id
