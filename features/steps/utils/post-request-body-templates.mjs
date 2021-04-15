import { CreatePostRequestBodyBuilder } from "./post-request-body"

export const defaultPost = (authorId, authorName) => {
  const requestBodyBuilder = new CreatePostRequestBodyBuilder()
  requestBodyBuilder.addAuthor(authorId, authorName)
  requestBodyBuilder.addTitle("Test title")
  requestBodyBuilder.addCategories(["cat1", "cat2"])
  requestBodyBuilder.addTags(["tag1", "tag2"])
  requestBodyBuilder.addContent("Test content")

  return requestBodyBuilder.build()
}

export const aBitDifferentDefaultPost = (authorId, authorName) => {
  const requestBodyBuilder = new CreatePostRequestBodyBuilder()
  requestBodyBuilder.addAuthor(authorId, authorName)
  requestBodyBuilder.addTitle("Wow, so different")
  requestBodyBuilder.addCategories(["lorem", "ipsem"])
  requestBodyBuilder.addTags(["super", "man"])
  requestBodyBuilder.addContent("Chocolate starfish")

  return requestBodyBuilder.build()
}
