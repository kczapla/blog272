import { defineFeature, loadFeature } from "jest-cucumber"

import { makeBob } from "./utils/authors"
import { defaultPost } from "./utils/post-request-body-templates"

const feature = loadFeature("./features/create-new-post.feature")

defineFeature(feature, (test) => {
  test("Create new post by logged in user", ({ given, when, then }) => {
    const bob = makeBob()
    given("user is logged-in as Bob", async () => {
      await bob.login()
    })

    let response
    when("user want to publish a new post", async () => {
      const publishRequestBody = bob.writePost(defaultPost)
      response = await bob.publishPost(publishRequestBody)
    })

    then("the server should handle it and return success status", () => {
      expect(response.status).toEqual(201)
      expect(response.header["content-location"]).toEqual(/\/posts\/\d+/)
      expect(response.body).toMatchPostResponseBody()
      expect(response.body).toMatchObject(bob.writePost(defaultPost))
    })
  })

  test("Do not create post if required property is missing", ({
    given,
    and,
    but,
    when,
    then,
  }) => {
    const bob = makeBob()
    given("user is logged-in as Bob", async () => {
      await bob.login()
    })

    let createPostRequestBody
    and("he wrote a post", () => {
      createPostRequestBody = bob.writePost(defaultPost)
    })

    but(/^he forgot to put (.*) in request body$/, (propertyName) => {
      delete createPostRequestBody[propertyName]
    })

    let postPublishResponse
    when("he wants to publish a new post", async () => {
      postPublishResponse = await bob.publishPost(createPostRequestBody)
    })

    then(
      "the server should reject the reuqest and return failure status",
      () => {
        expect(postPublishResponse.status).toEqual(400)
        expect(postPublishResponse.body).toMatchErrorMessageSchema()
      }
    )
  })
})
