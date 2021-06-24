import { defineFeature, loadFeature } from "jest-cucumber"
import { matchers } from "jest-json-schema"

import { readPost, createPost, createUser, loginUser } from "./api-client"
import { makeDefaultCreatePostRequestBody } from "./request-bodies"
import { postResponseSchema } from "./response-schemas"

expect.extend(matchers)

const feature = loadFeature("./features/create-post.feature")

defineFeature(feature, (test) => {
  test("Create post", ({ given, when, then }) => {
    let token
    given("Bob is logged in", async () => {
      const email = "createpostbob@gmail.com"
      const password = "createpostbob1"
      const createUserResponse = await createUser({
        name: "createpostbob",
        email: email,
        password: password,
      })
      expect(createUserResponse.status).toEqual(201)

      const loginUserResponse = await loginUser({
        email: email,
        password: password,
      })
      expect(loginUserResponse.status).toEqual(201)

      token = loginUserResponse.data.token
    })

    let postId
    when("he writes new post", async () => {
      const createPostDto = makeDefaultCreatePostRequestBody()
      const createPostResponse = await createPost(createPostDto, token)

      expect(createPostResponse.status).toEqual(201)

      postId = createPostResponse.data.id
    })

    then("server should add it to the blog", async () => {
      const readPostResponse = await readPost(postId)
      expect(readPostResponse.status).toEqual(200)
      expect(readPostResponse.data).toMatchSchema(postResponseSchema)
    })
  })
})
