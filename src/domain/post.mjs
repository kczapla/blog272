class Post {
  constructor({
    id,
    title,
    publishingDate,
    author,
    tags,
    categories,
    content,
  }) {
    this.id = id
    this.title = title
    this.publishingDate = new Date(publishingDate)
    this.author = author
    this.tags = tags
    this.categories = categories
    this.content = content
  }
}

export default Post
