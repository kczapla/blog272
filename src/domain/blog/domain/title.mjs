import { InvalidPostDataError } from "./index.mjs"

class Title {
  constructor(title) {
    this.title = title
  }

  getValue() {
    return this.title
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(title) {
    if (title === undefined) {
      throw new InvalidPostDataError("Title is undefined.")
    }
    if (title === null) {
      throw new InvalidPostDataError("Title is null.")
    }
    if (title.length < 3 || 100 < title.length) {
      throw new InvalidPostDataError("Title length must be in range [3, 100].")
    }
    return new Title(title)
  }
}

export default Title
