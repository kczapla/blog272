import { InvalidPostDataError } from "./index.mjs"

class Post {
  constructor(id, title, author, publishingDate, tags, content) {
    this.id = id
    this.title = title
    this.author = author
    this.publishingDate = publishingDate
    this.tags = tags
    this.content = content
  }

  getId() {
    return this.id
  }

  getTitle() {
    return this.title
  }

  getAuthor() {
    return this.author
  }

  getPublishingDate() {
    return this.publishingDate
  }

  getTags() {
    return this.tags
  }

  getContent() {
    return this.content
  }

  static create(id, title, author, publishingDate, tags, content) {
    if (id === null || id === undefined) {
      throw new InvalidPostDataError("Post's id is null or undefined.")
    }
    if (title === null || title === undefined) {
      throw new InvalidPostDataError("Post's title is null or undefined.")
    }
    if (author === null || author === undefined) {
      throw new InvalidPostDataError("Post's author is null or undefined.")
    }
    if (publishingDate === null || publishingDate === undefined) {
      throw new InvalidPostDataError("Post's author is null or undefined.")
    }
    if (tags === null || tags === undefined) {
      throw new InvalidPostDataError("Post's tags are null or undefined.")
    }
    if (content === null || content === undefined) {
      throw new InvalidPostDataError("Post's content are null or undefined.")
    }

    return new Post(id, title, author, publishingDate, tags, content)
  }
}

export default Post
