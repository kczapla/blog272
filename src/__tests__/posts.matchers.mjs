const makeObjectFieldMatcher = (obj) => {
  return (name) => {
    class Field {
      toBeInstanceOf(typeName) {
        if (!(name in obj)) {
          throw `${name} field is not in response body`
        }
        if (typeof obj[name] !== typeName) {
          throw `${obj} field type is not ${typeName}`
        }
      }
    }
    return new Field()
  }
}

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
})
