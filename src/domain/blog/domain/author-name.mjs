import InvalidPostDataError from "./invalid-post-data-error"

class AuthorName {
  constructor(authorName) {
    this.authorName = authorName
  }

  getValue() {
    return this.authorName
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(authorName) {
    const minLength = 2
    const maxLength = 32
    if (authorName === null) {
      throw new InvalidPostDataError("Authors name is null.")
    }
    if (authorName === undefined) {
      throw new InvalidPostDataError("Authors name is undefined.")
    }
    if (authorName.length < minLength || maxLength < authorName.length) {
      throw new InvalidPostDataError(
        `Content is lenght is ${authorName.length}. It must be in range [${minLength}, ${maxLength}].`
      )
    }
    return new AuthorName(authorName)
  }
}

export default AuthorName
