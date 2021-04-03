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
  toMatchPostResponseBody(response) {
    try {
      hasPostResponseBody(response.body)
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
  toBeAnArrayOfPosts(responseBody) {
    if (!Array.isArray(responseBody)) {
      return { pass: false, message: () => "Response body is not an array." }
    }
    try {
      responseBody.forEach(hasPostResponseBody)
    } catch (error) {
      const extendedMessage = "Response's array item " + error
      return { pass: false, message: () => extendedMessage }
    }
    return { pass: true, message: () => "" }
  },
  arrayToHaveAuthorInEachPost(responseBody, author) {
    const hasTheAuthor = (post) => {
      if (!(author !== post.author.name)) {
        throw `${author} doesn't equal ${post.author}.`
      }
    }
    try {
      responseBody.forEach(hasPostResponseBody)
      responseBody.forEach(hasTheAuthor)
    } catch (error) {
      const extendedMessage = "Response's post " + error
      return { pass: false, message: () => extendedMessage }
    }
    return { pass: true, message: () => "" }
  },
  arrayToContainABCInTitleOfEachPost(responseBody, title) {
    if (!Array.isArray(responseBody)) {
      return { pass: false, message: () => "Response body is not an array." }
    }
    const postsWithoutGivenTitle = responseBody.filter(
      (post) => !(title in post.title)
    )

    if (postsWithoutGivenTitle > 0) {
      const ids = postsWithoutGivenTitle.map((post) => post.id)
      return {
        pass: false,
        message: () => `Posts ${ids} don't contain '${title}' in thier titles.`,
      }
    }
    return { pass: true, message: () => "" }
  },
  arrayToHaveOneOfTheCategoryInEachPost(responseBody, categories) {
    if (!Array.isArray(responseBody)) {
      return { pass: false, message: () => "Response body is not an array." }
    }
    const doesArrayIntersect = (post) => {
      const intesection = categories.filter((value) =>
        post.categories.include(value)
      )
      return intesection.length > 0
    }

    const postsWithExpectedCategories = responseBody.filter(doesArrayIntersect)

    if (postsWithExpectedCategories.length == 0) {
      return {
        pass: false,
        message: () => `No post in categories: ${categories}`,
      }
    }
    return { pass: true, message: () => "" }
  },
  postsArrayIsPublishedWithinRange(responseBody, from, to) {
    if (!Array.isArray(responseBody)) {
      return { pass: false, message: () => "Response body is not an array." }
    }
    const postHavePublishDateWithinRange = (post) => {
      return from <= post.publish_date || post.publish_date < to
    }

    const isEveryPostWithinRange = responseBody.every(
      postHavePublishDateWithinRange
    )
    if (!isEveryPostWithinRange) {
      const postsNotInRange = responseBody.filter(
        (post) => !postHavePublishDateWithinRange(post)
      )
      const ids = postsNotInRange.map((post) => post.id)
      return {
        pass: false,
        message: () => `Posts with ${ids} are not in range(${from}, ${to}).`,
      }
    }
    return { pass: true, message: () => "" }
  },
  arrayToHaveOneOfTheTagInEachPost(responseBody, tags) {
    if (!Array.isArray(responseBody)) {
      return { pass: false, message: () => "Response body is not an array." }
    }
    const doesArrayIntersect = (post) => {
      const intesection = tags.filter((value) => post.tags.include(value))
      return intesection.length > 0
    }

    const postsWithExpectedCategories = responseBody.filter(doesArrayIntersect)

    if (postsWithExpectedCategories.length == 0) {
      return { pass: false, message: () => `No post in tags: ${tags}` }
    }
    return { pass: true, message: () => "" }
  },
})
