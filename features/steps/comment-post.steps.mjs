import { defineFeature, loadFeature } from "jest-cucumber"
import { matchers } from "jest-json-schema"

import {
  createComment,
  readPost,
  createPost,
  createUser,
  loginUser,
} from "./api-client"
import { makeDefaultCreatePostRequestBody } from "./request-bodies"
import { postResponseSchema } from "./response-schemas"

const feature = loadFeature("./features/comment-post.feature")

defineFeature(feature, (test) => {
  test("Logged in user comments post", ({ given, when, then }) => {
    let marksAuthToken
    let marksPostId
    let bobsAuthToken
    given("Mark wrote a post", async () => {
      const marksEmail = "commentpostmark@gmail.com"
      const marksPassword = "commentpostmark1234!"
      const createMarkRequest = {
        email: marksEmail,
        password: marksPassword,
        name: "commentpostmark",
      }
      const createMarkResponse = await createUser(createMarkRequest)
      expect(createMarkResponse.status).toEqual(201)

      const marksLoginRequest = {
        email: marksEmail,
        password: marksPassword,
      }
      const marksLoginResponse = await loginUser(marksLoginRequest)
      expect(marksLoginResponse.status).toEqual(201)
      marksAuthToken = marksLoginResponse.data.token

      const createPostDto = makeDefaultCreatePostRequestBody()
      createPostDto.title = "commentpostmark title"
      const createPostResponse = await createPost(createPostDto, marksAuthToken)
      marksPostId = createPostResponse.data.id
      expect(createMarkResponse.status).toEqual(201)

      const bobsEmail = "commentpostbob@gmail.com"
      const bobsPassowrd = "commentpostbob1234!"
      const createBobRequest = {
        email: bobsEmail,
        password: bobsPassowrd,
        name: "commentpostbob",
      }
      const createBobResponse = await createUser(createBobRequest)
      expect(createBobResponse.status).toEqual(201)

      const bobsLoginRequest = {
        email: bobsEmail,
        password: bobsPassowrd,
      }
      const bobsLoginResponse = await loginUser(bobsLoginRequest)
      expect(bobsLoginResponse.status).toEqual(201)
      bobsAuthToken = bobsLoginResponse.data.token
    })

    when("Bob comments on it", async () => {
      const createCommentRequestBody = {
        content: "ebe ebe ebe",
      }
      const createCommentByBobResponse = await createComment(
        marksPostId,
        createCommentRequestBody,
        bobsAuthToken
      )
      expect(createCommentByBobResponse.status).toEqual(201)
    })
    then("the server should add Bob's comment to Mark's post", async () => {
      const getMarksPostResponse = await readPost(marksPostId)
      expect(getMarksPostResponse.status).toEqual(200)
      expect(getMarksPostResponse.data.comments[0]).toMatchObject({
        authorId: /\d+/,
        publishingDate: /.*/,
        content: "ebe ebe ebe",
      })
    })
  })
})
