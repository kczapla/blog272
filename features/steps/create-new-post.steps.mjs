import { defineFeature, loadFeature } from "jest-cucumber"
import axios from "axios"

import {
  makePostRequestBody,
  makePostRequestBodyWithout,
  createPost,
  getJWTToken,
} from "./utils/posts-test-utils"

const feature = loadFeature("./features/create-new-post.feature")
const baseUrl = "http://127.0.0.1:3000/api/v0"
const postsUrl = baseUrl + "/posts"

defineFeature(feature, (test) => {
  test("Create new post by logged in user", ({ given, when, then }) => {
    let token
    given("user is logged-in as Bob", async () => {
      token = await getJWTToken()
    })

    let response
    when("user want to publish a new post", async () => {
      response = await createPost(makePostRequestBody(), token)
    })

    then("the server should handle it and return success status", () => {
      expect(response.status).toEqual(201)
      expect(response.header["content-location"]).toEqual(/\/posts\/\d+/)
      expect(response.body).toMatchPostResponseBody()
    })
  })

  test("Do not create post if required property is missing", ({
    given,
    and,
    when,
    then,
  }) => {
    let token
    given("user is logged-in as Bob", async () => {
      token = await getJWTToken()
    })

    let postRequestBody
    and(/^request body is missing (.*)$/, (fieldName) => {
      postRequestBody = makePostRequestBodyWithout(fieldName)
    })

    let requestResponse
    when("user wants to publish a new post", async () => {
      requestResponse = await createPost(postRequestBody, token)
    })

    then(
      "the server should reject the reuqest and return failure status",
      () => {
        expect(requestResponse.status).toEqual(400)
        expect(requestResponse.body).toMatchErrorMessageSchema()
      }
    )
  })
})
