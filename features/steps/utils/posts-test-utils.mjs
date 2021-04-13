import axios from "axios"
import url from "./url"
import login from "./log-in"
import postsApi from "./api/posts"

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

const postQueryBuilder = new PostsQueryBuilder(url.posts())

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

export const makePostRequestBody = () => {
  return {
    author: {
      id: 1,
      name: "john",
    },
    title: "Test title",
    categories: ["cat1", "cat2"],
    tags: ["tag1", "tag2"],
    content: "Test content",
  }
}

export const makeCustomPostRequestBody = (customProperties) => {
  const postBody = makeCustomPostRequestBody()
  return Object.assign(postBody, customProperties)
}

export const makePostRequestBodyWithout = (propertyName) => {
  let postRequestBody = makePostRequestBody()
  delete postRequestBody[propertyName]

  return postRequestBody
}

export const getJWTToken = async () => {
  return await login.asBob()
}

export const createPost = async (postBody, jwtToken) => {
  return await postsApi.create(postBody, jwtToken)
}

export const updatePost = async (putBody, postId, jwtToken) => {
  return await postsApi.update(putBody, postId, jwtToken)
}
