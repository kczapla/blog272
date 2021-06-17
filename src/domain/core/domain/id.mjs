import CoreDomainError from "./core-domain-error"

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
      throw new CoreDomainError("Id value must be a string")
    }
    if (id === null) {
      throw new CoreDomainError("Id value is null.")
    }
    if (id === undefined) {
      throw new CoreDomainError("Id value is undefined.")
    }
    if (id === "") {
      throw new CoreDomainError("Id is empty.")
    }
    return new Id(id)
  }
}

export default Id
