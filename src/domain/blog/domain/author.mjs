import InvalidPostDataError from "./invalid-post-data-error"

class Author {
  constructor(id, authorName) {
    this.id = id
    this.authorName = authorName
  }

  getId() {
    return this.id
  }

  getAuthorName() {
    return this.authorName
  }

  static create(id, authorName) {
    if (id === null || id === undefined) {
      throw new InvalidPostDataError("Author id is null or undefined.")
    }

    if (authorName === null || authorName === undefined) {
      throw new InvalidPostDataError("Author's name is null or undefined.")
    }

    return new Author(id, authorName)
  }
}

export default Author
