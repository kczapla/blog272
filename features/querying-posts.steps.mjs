import { defineFeature, loadFeature } from "jest-cucumber"
import axios from "axios"

const feature = loadFeature("./features/querying-posts.feature")
const url = "http://127.0.0.1:3000/api/v0/posts"

defineFeature(feature, (test) => {
  test("List all posts on the blog", ({ when, then }) => {
    let response
    when("users want to get all posts", async () => {
      response = await axios.get(url)
    })
    then("the server should return posts", () => {
      expect(response.status).toEqual(200)
      expect(response.data).toBeAnArrayOfPosts()
    })
  })

  test("List all posts published by John", ({ when, then }) => {
    let response
    when("users want to get all posts published by John", async () => {
      response = await axios.get(url + "?author=John")
    })
    then("the server should return posts published by John", () => {
      expect(response.status).toEqual(200)
      expect(response.data).arrayToHaveAuthorInEachPost("John")
    })
  })

  test("List all posts that contain ABC in their title", ({ when, then }) => {
    let response
    when(
      "users want get all posts with 'Building' in their title",
      async () => {
        response = await axios.get(url + "?title=Building")
      }
    )
    then(
      "the server should return posts that have 'Building' in their title",
      () => {
        expect(response.status).toEqual(200)
        expect(response.data).arrayToHaveAuthorInEachPost()
        expect(response.data).arrayToContainABCInTitleOfEachPost("Building")
      }
    )
  })

  test("List all posts that have one or more category", ({ when, then }) => {
    let response
    when(
      "users want to get all posts with one or more category from [home, plants]",
      async () => {
        response = await axios.get(url + "?category=home&category=plants")
      }
    )

    then(
      "the server should return posts that have one or more of this categories",
      () => {
        expect(response.status).toEqual(200)
        const data = response.data
        expect(data).arrayToHaveOneOfTheCategoryInEachPost(["home", "plants"])
      }
    )
  })
  test("List all posts that have one or more tag", ({ when, then }) => {
    let response
    when("user wants to get posts tagged as [cmake, markdown]", async () => {
      response = await axios.get(url + "?tags=cmake&tags=markdown")
    })

    then("the server should return only posts with these tags", () => {
      expect(response.status).toEqual(200)
      expect(response.body).arrayToHaveOneOfTheTagInEachPost([
        "cmake",
        "markdown",
      ])
    })
  })

  test("List all posts published in time range", ({ when, then }) => {
    let response
    when(
      /^users want to get all posts published in January (.*)$/,
      async (year) => {
        response = await axios.get(
          url + `?published_after=${year}-01-01&published_before=${year}-02-01`
        )
      }
    )

    then("the server should return posts published in that range", () => {
      expect(response.status).toEqual(200)
      expect(response.body).postsArrayIsPublishedWithinRange(
        new Date("2021-01-01"),
        new Date("2021-02-01")
      )
    })
  })
})
