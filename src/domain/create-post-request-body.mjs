class CreatePostRequestBody {
  constructor({ title, author, categories, tags, content }) {
    this.title = title
    this.author = author
    this.categories = categories !== undefined ? categories : []
    this.tags = tags !== undefined ? tags : []
    this.content = content
  }
}

export default CreatePostRequestBody
