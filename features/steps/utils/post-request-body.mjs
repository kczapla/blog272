export class CreatePostRequestBodyBuilder {
  constructor() {
    this.body = {
      author: {},
      title: "",
      categories: [],
      tags: [],
      content: "",
    }
  }

  addAuthor(authorId, authorName) {
    this.body.author = { id: authorId, name: authorName }
  }

  addTitle(title) {
    this.body.title = title
  }

  addCategories(categories) {
    this.body.categories.push(...categories)
  }

  addTags(tags) {
    this.body.tags.push(...tags)
  }

  addContent(content) {
    this.body.content = content
  }

  build() {
    return this.body
  }
}
