import { defineFeature, loadFeature } from "jest-cucumber"
import { matchers } from "jest-json-schema"
expect.extend(matchers)

import { postResponseSchema } from "./response-schemas"
import { makeDefaultCreatePostRequestBody } from "./request-bodies"
import { createPost, deletePost, readPost } from "./api-client"

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
  test("Delete published post", ({ given, when, then }) => {
    let bobsPostId
    given("Bob published a post to the blog", async () => {
      const response = await createPost(makeDefaultCreatePostRequestBody())
      expect(response.status).toEqual(201)
      bobsPostId = response.data.id
    })

    let deleteResponse
    when("he sends delete request to the server", async () => {
      deleteResponse = await deletePost(bobsPostId)
    })

    then("server should delete it and return success status", () => {
      expect(deleteResponse.status).toEqual(204)
    })
  })
})
