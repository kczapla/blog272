import { makeObjectFieldMatcher } from "./utils"

const hasPostResponseBody = (responseBody) => {
  const expectResponseBodyField = makeObjectFieldMatcher(responseBody)
  expectResponseBodyField("id").toBeInstanceOf("number")
  expectResponseBodyField("publish_date").toBeInstanceOf("string")
  expectResponseBodyField("author").toBeInstanceOf("object")
  expectResponseBodyField("categories").toBeInstanceOf("array")
  expectResponseBodyField("tags").toBeInstanceOf("array")
  expectResponseBodyField("title").toBeInstanceOf("string")
  expectResponseBodyField("content").toBeInstanceOf("string")
  expectResponseBodyField("comments").toBeInstanceOf("array")
}

const hasPostAuthorResponseBody = (responseBody) => {
  const expectResponseBodyField = makeObjectFieldMatcher(responseBody)
  expectResponseBodyField("id").toBeInstanceOf("number")
  expectResponseBodyField("name").toBeInstanceOf("string")
}

const hasPostCommentResponseBody = (responseBody) => {
  const expectResponseBodyFiled = makeObjectFieldMatcher(responseBody)
  expectResponseBodyFiled("id").toBeInstanceOf("number")
  expectResponseBodyFiled("author").toBeInstanceOf("object")
  hasPostAuthorResponseBody(responseBody.author)
  expectResponseBodyFiled("date").toBeInstanceOf("string")
  expectResponseBodyFiled("content").toBeInstanceOf("string")
}

expect.extend({
  toMatchPostResponseBodySchema(response) {
    try {
      hasPostResponseBody(response.body)
    } catch (error) {
      return { pass: false, message: () => error }
    }
    return { pass: true, message: () => "" }
  },
  toMatchPostAuthorResponseBody(response) {
    try {
      hasPostAuthorResponseBody(response.body.author)
    } catch (error) {
      return { pass: false, message: () => error }
    }
    return { pass: true, message: () => "" }
  },
  toMatchNthPostCommentResponseBody(response, nthComment) {
    try {
      hasPostCommentResponseBody(response.body.comments[nthComment])
    } catch (error) {
      return { pass: false, message: () => error }
    }
    return { pass: true, message: () => "" }
  },
  toMatchSuccessfulGETPostsRootResponseWithNLengthArrayOfPosts(
    response,
    length
  ) {
    if (response.status !== 200) {
      return { pass: false, message: () => "Response status is not 200." }
    }
    if (!/json/.test(response.header["content-type"])) {
      return {
        pass: false,
        message: () =>
          `Response content type is ${response.header["content-type"]}. Should be JSON.`,
      }
    }
    if (!Array.isArray(response.body)) {
      return { pass: false, message: () => "Response body is not an array." }
    }
    if (response.body !== length) {
      return {
        pass: false,
        message: () =>
          `Length response body array is ${response.body.length}. Should be ${length}.`,
      }
    }

    try {
      response.body.forEach(hasPostResponseBody)
    } catch (error) {
      const extendedMessage = "Response's array item " + error
      return { pass: false, message: () => extendedMessage }
    }
    return { pass: true, message: () => "" }
  },
})
