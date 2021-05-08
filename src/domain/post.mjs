class Post {
  constructor({
    id,
    title,
    publishing_date,
    author,
    tags,
    categories,
    content,
  }) {
    this.id = id
    this.title = title
    this.publishing_date = publishing_date
    this.author = author
    this.tags = tags
    this.categories = categories
    this.content = content
  }
}

export default Post
