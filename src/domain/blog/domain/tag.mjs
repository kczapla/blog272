import InvalidPostDataError from "./invalid-post-data-error"

class Tag {
  constructor(tag) {
    this.tag = tag
  }

  getValue() {
    return this.tag
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(tag) {
    if (tag === undefined) {
      throw new InvalidPostDataError("Tag is undefined.")
    }
    if (tag === null) {
      throw new InvalidPostDataError("Tag is null.")
    }
    if (tag.length < 1 || 20 < tag.length) {
      throw new InvalidPostDataError("Title length must be in range [1, 20].")
    }
    return new Tag(tag)
  }
}

export default Tag
