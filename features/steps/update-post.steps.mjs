import { defineFeature, loadFeature } from "jest-cucumber"

import {
  makePostRequestBody,
  makePostRequestBodyWithout,
  makeCustomPostRequestBody,
  createPost,
  getJWTToken,
} from "./utils/posts-test-utils"

import login from "./utils/log-in"
import postRequestBody from "./utils/post-request-body"
import postsApi from "./utils/api/posts"

const feature = loadFeature("./features/update-post.feature")

defineFeature(feature, (test) => {
  test("Update post", ({ given, and, when, then }) => {
    let token
    given("Bob is logged in", async () => {
      token = await getJWTToken()
    })

    and("he created post sometime ago", async () => {
      await createPost(makePostRequestBody(), token)
    })

    let updatePostRequestBody
    and("he wants to update it", () => {
      updatePostRequestBody = makeCustomPostRequestBody({ title: "new title" })
    })

    let updatePostResponse
    when("he sends an updated content to the server", async () => {
      updatePostResponse = await updatePost(updatePostRequestBody, token)
    })

    then("the server should handle it and return success status", () => {
      expect(updatePostResponse.status).toEqual(200)
      expect(updatePostResponse.header["content-location"]).toEqual(
        /\/posts\/\d+/
      )
      expect(response.body).toMatchPostResponseBody()
      expect(response.body.title).toMatchObject(updatePostResponse)
    })
  })

  test("Do not update post if required property is missing", ({
    given,
    and,
    but,
    when,
    then,
  }) => {
    let token
    given("Bob is logged in", async () => {
      token = await getJWTToken()
    })

    let postToUpdateId
    and("he created post sometime ago", async () => {
      response = await createPost(makePostRequestBody(), token)
      postToUpdateId = response.body.id
    })

    let updatePostRequestBody
    and("he wants to update it", () => {
      updatePostRequestBody = makePostRequestBody()
    })

    but(/^he forgot to put (.*) in request body$/, (property) => {
      delete updatePostRequestBody[property]
    })

    let response
    when("he sends an update content to the server", async () => {
      response = await updatePost(updatePostRequestBody, postToUpdateId, token)
    })

    then(
      "the server should reject the request and return failure status",
      () => {
        expect(response.status).toEqual(400)
        expect(response.body).toMatchErrorMessageSchema()
      }
    )
  })
  test("Reject update request if post doesn't exist", ({
    given,
    and,
    but,
    when,
    then,
  }) => {
    let token
    given("Bob is logged in", async () => {
      token = await getJWTToken()
    })

    let updatePostRequestBody
    and("he wants to update a post", () => {
      updatePostRequestBody = makePostRequestBody()
    })

    let postToUpdateId
    but("the post doesn't exist", () => {
      postToUpdateId = 1
    })

    let response
    when("he sends an update request to the server", async () => {
      response = await updatePost(updatePostRequestBody, postToUpdateId, token)
    })

    then(
      "the server should reject the request and return failure status",
      () => {
        expect(response.status).toEqual(400)
        expect(response.body).toMatchErrorMessageSchema()
      }
    )
  })

  test("Reject an update request if not send by post author", ({
    given,
    but,
    when,
    then,
  }) => {
    let marksPostId
    given("Mark published a post", async () => {
      const token = await login.asMark()
      const requestBody = postRequestBody.createdBy({ id: 2, name: "Mark" })
      const response = await postsApi.create(requestBody, token)
      marksPostId = response.body.id
    })

    let bobsToken
    let bobsRequestBody
    but("Bob wants to update it", async () => {
      bobsToken = await login.asBob()
      bobsRequestBody = postRequestBody.createdBy({ id: 1, name: "Bob" })
    })

    let response
    when("he sends an update request to the server", async () => {
      response = postsApi.update(bobsRequestBody, marksPostId, bobsToken)
    })

    then(
      "the server should reject the request and return failure status",
      () => {
        expect(response.status).toEqual(401)
        expect(response.body).toMatchErrorMessageSchema()
      }
    )
  })
})
