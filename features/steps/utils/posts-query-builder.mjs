import url from "./url"

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

  addPublishedFrom(fromDate) {
    this.query.push(`published_from=${fromDate}`)
  }

  addPublishedTo(toDate) {
    this.query.push(`published_to=${toDate}`)
  }

  build() {
    return url.posts() + "&" + this.query.join("&")
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
