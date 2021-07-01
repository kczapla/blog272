import { defineFeature, loadFeature } from "jest-cucumber"

import { makeDefaultCreatePostRequestBody } from "./request-bodies"
import { createPost, deletePost, createUser, loginUser } from "./api-client"
import { readPost } from "./api-client/index.mjs"

const feature = loadFeature("./features/delete-post.feature")

defineFeature(feature, (test) => {
  test("Delete published post", ({ given, when, then }) => {
    let token
    let postId
    given("Bob is logged in", async () => {
      const email = "deletepostbob@gmail.com"
      const password = "deletepostbob1"
      const createUserResponse = await createUser({
        name: "deletepostbob",
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

      const createPostDto = makeDefaultCreatePostRequestBody()
      const createPostResponse = await createPost(createPostDto, token)

      expect(createPostResponse.status).toEqual(201)

      postId = createPostResponse.data.id
    })

    when("he deletes post from the blog", async () => {
      const deleteResponse = await deletePost(postId, token)
      console.log(deleteResponse)
      expect(deleteResponse.status).toEqual(204)
    })

    then("server should delete it", async () => {
      const readResponse = await readPost(postId)
      expect(readResponse.status).toEqual(404)
    })
  })
  test("Only post's author can delete his post", ({ given, when, then }) => {
    let postId
    given("Bob is logged in", async () => {
      const email = "deletenotowningposmark@gmail.com"
      const password = "deletenotowningposmark"
      const createUserResponse = await createUser({
        name: "deletenotowningposmark",
        email: email,
        password: password,
      })
      expect(createUserResponse.status).toEqual(201)
      const loginUserResponse = await loginUser({
        email: email,
        password: password,
      })
      expect(loginUserResponse.status).toEqual(201)
      const token = loginUserResponse.data.token
      const createPostDto = makeDefaultCreatePostRequestBody()
      const createPostResponse = await createPost(createPostDto, token)
      expect(createPostResponse.status).toEqual(201)
      postId = createPostResponse.data.id
    })

    let deletePostUserWasNotAuthor
    when("he deletes Mark's post", async () => {
      const email = "deletenotowningposbob@gmail.com"
      const password = "deletenotowningposbob"
      const createUserResponse = await createUser({
        name: "deletenotowningposbob",
        email: email,
        password: password,
      })
      expect(createUserResponse.status).toEqual(201)
      const loginUserResponse = await loginUser({
        email: email,
        password: password,
      })
      expect(loginUserResponse.status).toEqual(201)
      const token = loginUserResponse.data.token
      deletePostUserWasNotAuthor = await deletePost(postId, token)
    })

    then("the server should reject his request", () => {
      expect(deletePostUserWasNotAuthor.status).toEqual(403)
    })
  })
})
