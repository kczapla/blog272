class Post {
  constructor({ id, title, publish_date, author, tags, categories, content }) {
    this.id = id
    this.title = title
    this.publish_date = publish_date
    this.author = author
    this.tags = tags
    this.categories = categories
    this.content = content
  }
}

export default Post
