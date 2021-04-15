import { defineFeature, loadFeature } from "jest-cucumber"

import { makeBob, makeMark } from "./utils/authors"
import {
  defaultPost,
  aBitDifferentDefaultPost,
} from "./utils/post-request-body-templates"

const feature = loadFeature("./features/update-post.feature")

defineFeature(feature, (test) => {
  test("Update post", ({ given, and, when, then }) => {
    const bob = makeBob()
    given("Bob is logged in", async () => {
      await bob.login()
    })

    let publishedPostId
    and("he created post sometime ago", async () => {
      const bobsPostRequestBody = bob.writePost(defaultPost)
      const postPublishResponse = await bob.publishPost(bobsPostRequestBody)
      publishedPostId = postPublishResponse.body.id
    })

    let updatePostRequestBody
    and("he wants to update it", () => {
      updatePostRequestBody = bob.writePost(aBitDifferentDefaultPost)
    })

    let updatePostResponse
    when("he sends an updated content to the server", async () => {
      updatePostResponse = await bob.updatePost(
        publishedPostId,
        updatePostRequestBody
      )
    })

    then("the server should handle it and return success status", () => {
      expect(updatePostResponse.status).toEqual(200)
      expect(updatePostResponse.header["content-location"]).toEqual(
        /\/posts\/\d+/
      )
      expect(updatePostResponse.body).toMatchPostResponseBody()
      expect(updatePostResponse.body.title).toMatchObject(updatePostRequestBody)
    })
  })

  test("Do not update post if required property is missing", ({
    given,
    and,
    but,
    when,
    then,
  }) => {
    const bob = makeBob()
    given("Bob is logged in", async () => {
      await bob.login()
    })

    let publishedPostId
    and("he created post sometime ago", async () => {
      const bobsPostRequestBody = bob.writePost(defaultPost)
      const postPublishedResponse = await bob.publishPost(bobsPostRequestBody)
      publishedPostId = postPublishedResponse.body.id
    })

    let updatePostRequestBody
    and("he wants to update it", () => {
      updatePostRequestBody = bob.writePost(aBitDifferentDefaultPost)
    })

    but(/^he forgot to put (.*) in request body$/, (property) => {
      delete updatePostRequestBody[property]
    })

    let updateResponse
    when("he sends an update content to the server", async () => {
      updateResponse = await bob.updatePost(
        publishedPostId,
        updatePostRequestBody
      )
    })

    then(
      "the server should reject the request and return failure status",
      () => {
        expect(updateResponse.status).toEqual(400)
        expect(updateResponse.body).toMatchErrorMessageSchema()
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
    const bob = makeBob()
    given("Bob is logged in", async () => {
      await bob.login()
    })

    let updatePostRequestBody
    and("he wants to update a post", () => {
      updatePostRequestBody = bob.writePost(defaultPost)
    })

    let postToUpdateId
    but("the post doesn't exist", () => {
      postToUpdateId = 1
    })

    let postUpdateResponse
    when("he sends an update request to the server", async () => {
      postUpdateResponse = await bob.updatePost(
        postToUpdateId,
        updatePostRequestBody
      )
    })

    then(
      "the server should reject the request and return failure status",
      () => {
        expect(postUpdateResponse.status).toEqual(400)
        expect(postUpdateResponse.body).toMatchErrorMessageSchema()
      }
    )
  })

  test("Reject an update request if not send by post author", ({
    given,
    but,
    when,
    then,
  }) => {
    let postPublishedByMarkId
    given("Mark published a post", async () => {
      const mark = makeMark()
      await mark.login()

      const publishPostRequestBody = mark.writePost(defaultPost)
      const postPublishResponse = mark.publishPost(publishPostRequestBody)

      postPublishedByMarkId = postPublishResponse.body.id
    })

    const bob = makeBob()
    let bobsUpdateRequestBody
    but("Bob wants to update it", async () => {
      await bob.login()
      bobsUpdateRequestBody = bob.writePost(defaaultPost)
    })

    let bobsPostUpdateResponse
    when("he sends an update request to the server", async () => {
      bobsPostUpdateResponse = await bob.updatePost(
        postPublishedByMarkId,
        bobsUpdateRequestBody
      )
    })

    then(
      "the server should reject the request and return failure status",
      () => {
        expect(bobsPostUpdateResponse.status).toEqual(401)
        expect(bobsPostUpdateResponse.body).toMatchErrorMessageSchema()
      }
    )
  })
})
