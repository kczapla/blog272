import { makeObjectFieldMatcher } from "./utils"

expect.extend({
  toMatchPostResponseBodySchema(response) {
    const expectResponseBodyField = makeObjectFieldMatcher(response.body)
    try {
      expectResponseBodyField("id").toBeInstanceOf("number")
      expectResponseBodyField("publish_date").toBeInstanceOf("string")
      expectResponseBodyField("author").toBeInstanceOf("object")
      expectResponseBodyField("categories").toBeInstanceOf("array")
      expectResponseBodyField("tags").toBeInstanceOf("array")
      expectResponseBodyField("title").toBeInstanceOf("string")
      expectResponseBodyField("content").toBeInstanceOf("string")
      expectResponseBodyField("comments").toBeInstanceOf("array")
    } catch (error) {
      return { pass: false, message: () => error }
    }
    return { pass: true, message: () => "" }
  },
  toMatchPostAuthorResponseBody(response) {
    const expectResponseBodyField = makeObjectFieldMatcher(response.body.author)
    try {
      expectResponseBodyField("id").toBeInstanceOf("number")
      expectResponseBodyField("name").toBeInstanceOf("string")
    } catch (error) {
      return { pass: false, message: () => error }
    }
    return { pass: true, message: () => "" }
  },
  toMatchNthPostCommentResponseBody(response, nthComment) {
    const expectCommentResponseBodyField = makeObjectFieldMatcher(
      response.body.comments[nthComment]
    )
    const expectCommentAuthorResponseBodyField = makeObjectFieldMatcher(
      response.body.comments[nthComment].author
    )
    try {
      expectCommentResponseBodyField("id").toBeInstanceOf("number")
      expectCommentResponseBodyField("author").toBeInstanceOf("object")
      expectCommentAuthorResponseBodyField("id").toBeInstanceOf("number")
      expectCommentAuthorResponseBodyField("name").toBeInstanceOf("string")
      expectCommentResponseBodyField("date").toBeInstanceOf("string")
      expectCommentResponseBodyField("content").toBeInstanceOf("string")
    } catch (error) {
      return { pass: false, message: () => error }
    }
    return { pass: true, message: () => "" }
  },
  contentTypeToBeJson(response) {
    if (/json/.test(response.header["content-type"])) {
      return { pass: true, message: () => "" }
    }
    return { pass: false, message: "Response content type is not json." }
  },
})
