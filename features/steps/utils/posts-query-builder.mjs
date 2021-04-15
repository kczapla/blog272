class PostsQueryBuilder {
  constructor() {
    this.query = []
  }

  addAuthor(author) {
    this.query.push(`author=${author}`)
  }

  addTitle(title) {
    this.query.push(`title=${title}`)
  }

  addCategory(category) {
    this.query.push(`categories=${category}`)
  }

  addTag(tag) {
    this.query.push(`tags=${tag}`)
  }

  build() {
    return this.url + this.query.join("&")
  }
}

export class ConvenientPostsQueryBuilder {
  constructor() {
    this.postQueryBuilder = new PostsQueryBuilder()
  }

  addAuthors(authors) {
    authors
      .split(",")
      .forEach((author) => this.postQueryBuilder.addCategory(author))
  }

  addTitles(titles) {
    titles.split(",").forEach((title) => this.postQueryBuilder.addTitle(title))
  }

  addCategories(categories) {
    categories
      .split(",")
      .forEach((category) => this.postQueryBuilder.addCategory(category))
  }

  addTags(tags) {
    tags.split(",").forEach((tag) => this.postQueryBuilder.addTag(tag))
  }

  build() {
    const query = this.postQueryBuilder.build()
    this.postQueryBuilder = new PostsQueryBuilder()
    return query
  }
}
