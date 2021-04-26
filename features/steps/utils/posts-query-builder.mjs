class PostsQueryBuilder {
  constructor() {
    this.query = {}
  }

  addAuthor(author) {
    this.query["author"] = author
  }

  addTitle(title) {
    this.query["title"] = title
  }

  addCategory(category) {
    if (!("categoires" in this.query)) {
      this.query["categories"] = []
    }
    this.query["categories"].push(category)
  }

  addTag(tag) {
    if (!("tags" in this.query)) {
      this.query["tags"] = []
    }
    this.query["tags"].push(tag)
  }

  addPublishedFrom(fromDate) {
    this.query["published_from"] = fromDate
  }

  addPublishedTo(toDate) {
    this.query["published_to"] = toDate
  }

  build() {
    const query = this.query
    this.query = {}
    return query
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

  addPublishedFromDates(fromDates) {
    fromDates
      .split(",")
      .forEach((fromDate) => this.postQueryBuilder.addPublishedFrom(fromDate))
  }

  addPublishedToDates(toDates) {
    toDates
      .split(",")
      .forEach((toDate) => this.postQueryBuilder.addPublishedTo(toDate))
  }

  build() {
    const query = this.postQueryBuilder.build()
    this.postQueryBuilder = new PostsQueryBuilder()
    return query
  }
}
