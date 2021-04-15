import { defineFeature, loadFeature } from "jest-cucumber"

import { ConvenientPostsQueryBuilder } from "./utils/posts-query-builder"
import posts from "./utils/api/posts"

const feature = loadFeature("./features/posts-queries-validation.feature")

defineFeature(feature, (test) => {
  test("Invalid author query", ({ given, when, then }) => {
    const queryBuilder = new ConvenientPostsQueryBuilder()
    given(/^author's name is (.*)$/, (authorNames) => {
      queryBuilder.addAuthors(authorNames)
    })

    let response
    when("user queries posts", async () => {
      response = await posts.index(queryBuilder.build())
    })

    then("the server should return an error", () => {
      expect(response.status).toEqual(400)
      expect(response).toMatchErrorMessageSchema()
    })
  })

  test("Invalid title query", ({ given, when, then }) => {
    const queryBuilder = new ConvenientPostsQueryBuilder()
    given(/^title is (.*)$/, (titles) => {
      queryBuilder.addTitles(titles)
    })

    let response
    when("user queries posts", async () => {
      response = await posts.index(queryBuilder.build())
    })

    then("the server should return an error", () => {
      expect(response.status).toEqual(400)
      expect(response).toMatchErrorMessageSchema()
    })
  })

  test("Invalid categories query", ({ given, when, then }) => {
    const queryBuilder = new ConvenientPostsQueryBuilder()
    given(/^query categories are (.*)$/, (category) => {
      queryBuilder.addCategories(category)
    })

    let response
    when("user queries posts", async () => {
      response = await posts.index(queryBuilder.build())
    })

    then("the server should return an error", () => {
      expect(response.status).toEqual(400)
      expect(response).toMatchErrorMessageSchema()
    })
  })

  test("Invalid tags query", ({ given, when, then }) => {
    const queryBuilder = new ConvenientPostsQueryBuilder()
    given(/^query tags are (.*)$/, (tags) => {
      queryBuilder.addTags(tags)
    })

    let response
    when("user queries posts", async () => {
      response = await posts.index(queryBuilder.build())
    })

    then("the server should return an error", () => {
      expect(response.status).toEqual(400)
      expect(response).toMatchErrorMessageSchema()
    })
  })
})
