import { defineFeature, loadFeature } from "jest-cucumber"
import axios from "axios"

import {
  makePostRequestBody,
  makePostRequestBodyWithout,
  makeCustomPostRequestBody,
  createPost,
  getJWTToken,
} from "./posts-test-utils"
import { updatePost } from "./posts-test-utils.mjs"

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
    and("now he wants to update it", () => {
      updatePostRequestBody = makeCustomPostRequestBody({ title: "new title" })
    })

    let updatePostResponse
    when("sending updated content to the server", async () => {
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

    and("he created post sometime ago", async () => {
      await createPost(makePostRequestBody(), token)
    })

    let updatePostRequestBody
    and("now he wants to update it", () => {
      updatePostRequestBody = makePostRequestBody()
    })

    but(/^he forgot to put (.*) in request body$/, (property) => {
      delete updatePostRequestBody[property]
    })

    let response
    when("sending update content to the server", async () => {
      response = await updatePost(updatePostRequestBody, token)
    })

    then(
      "the server should reject the request and return failure status",
      () => {
        expect(response.status).toEqual(400)
        expect(response.body).toMatchErrorMessageSchema()
      }
    )
  })
})
