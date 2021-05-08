import { defineFeature, loadFeature } from "jest-cucumber"
import { matchers } from "jest-json-schema"
expect.extend(matchers)

import { postResponseSchema } from "./response-schemas"
import { makeDefaultCreatePostRequestBody } from "./request-bodies"
import { createPost } from "./api-client"

const feature = loadFeature("./features/basic-posts-crud.feature")

defineFeature(feature, (test) => {
  test("Create new post", ({ given, when, then }) => {
    let postRequestBody
    given("Bob wrote a post", () => {
      postRequestBody = makeDefaultCreatePostRequestBody()
    })

    let createPostResponse
    when("he sends it to the server", async () => {
      createPostResponse = await createPost(postRequestBody)
    })

    then("server should add it to the blog", () => {
      expect(createPostResponse.status).toEqual(201)
      expect(createPostResponse.data).toMatchSchema(postResponseSchema)
    })
  })
})
