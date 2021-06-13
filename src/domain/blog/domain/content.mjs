import InvalidPostDataError from "./invalid-post-data-error"

class Content {
  constructor(content) {
    this.content = content
  }

  getValue() {
    return this.content
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(content) {
    const minLength = 50
    const maxLength = 10000
    if (content === null) {
      throw new InvalidPostDataError("Content is null.")
    }
    if (content === undefined) {
      throw new InvalidPostDataError("Content is undefined.")
    }
    if (content.length < minLength || maxLength < content.length) {
      throw new InvalidPostDataError(
        `Content is lenght is ${content.length}. It must be in range [${minLength}, ${maxLength}].`
      )
    }
    return new Content(content)
  }
}

export default Content
