import Tag from "./tag"
import InvalidPostDataError from "./invalid-post-data-error"

class Tags {
  constructor(tags) {
    this.tags = tags
  }

  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.tags.length) {
          return { value: this.tags[index++], done: false }
        } else {
          return { done: true }
        }
      },
    }
  }

  add(tag) {
    if (!(tag instanceof Tag)) {
      throw new InvalidPostDataError("Parameter must be an instance of Tag.")
    }
    if (this.tags.length === 100) {
      throw new InvalidPostDataError("Can't add more tags.")
    }
    this.tags.push(tag)
  }

  static create(tags) {
    if (tags === null) {
      throw new InvalidPostDataError("Tags are null.")
    }
    if (tags === undefined) {
      throw new InvalidPostDataError("Tags are undefined.")
    }
    if (!(tags instanceof Array)) {
      throw new InvalidPostDataError("Tags are not an array.")
    }
    if (tags.some((x) => !(x instanceof Tag))) {
      throw new InvalidPostDataError("Some items are not Tag instance.")
    }
    if (tags.length > 100) {
      throw new InvalidPostDataError("Single post can have only 100 tags.")
    }
    return new Tags(tags)
  }
}

export default Tags
