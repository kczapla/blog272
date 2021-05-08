import { defineFeature, loadFeature } from "jest-cucumber"
import { matchers } from "jest-json-schema"
expect.extend(matchers)

import { postResponseSchema } from "./response-schemas"
import { makeDefaultCreatePostRequestBody } from "./request-bodies"
import { createPost, readPost } from "./api-client"

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
  test("Read published post", ({ given, and, when, then }) => {
    let postRequestBody
    given("Bob wrote a post", () => {
      postRequestBody = makeDefaultCreatePostRequestBody()
    })

    let bobsPostId
    and("he published it to the blog", async () => {
      const createPostResponse = await createPost(postRequestBody)
      expect(createPostResponse.status).toEqual(201)
      bobsPostId = createPostResponse.data.id
    })

    let marksReadRequestResponse
    when("Mark wants to read Bob's post", async () => {
      marksReadRequestResponse = await readPost(bobsPostId)
    })

    then("server should return it", () => {
      expect(marksReadRequestResponse.status).toEqual(200)
      expect(marksReadRequestResponse.data).toMatchSchema(postResponseSchema)
    })
  })
})
