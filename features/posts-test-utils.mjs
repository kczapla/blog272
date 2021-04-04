class PostsQueryBuilder {
  constructor(url) {
    this.url = url + "/posts?"
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

const url = "http://127.0.0.1:3000/api/v0/posts"
const postQueryBuilder = new PostsQueryBuilder(url)

function buildQuery(values, callback) {
  values.split(",").forEach(callback)
  return postQueryBuilder.build()
}

export function createAuthorQuery(names) {
  return buildQuery(names, (name) => postQueryBuilder.addAuthor(name))
}

export function createPostTitle(titles) {
  return buildQuery(titles, (title) => postQueryBuilder.addTitle(title))
}

export function createCategoryQuery(categories) {
  return buildQuery(categories, (category) =>
    postQueryBuilder.addCategory(category)
  )
}

export function createTagQuery(tags) {
  return buildQuery(tags, (tag) => postQueryBuilder.addCategory(tag))
}
