import { defineFeature, loadFeature } from "jest-cucumber"
import axios from "axios"
import { createAuthorQuery, createPostTitle } from "./utils/posts-test-utils"
import {
  createCategoryQuery,
  createTagQuery,
} from "./utils/posts-test-utils.mjs"

const feature = loadFeature("./features/posts-queries-validation.feature")

defineFeature(feature, (test) => {
  test("Invalid author query", ({ given, when, then }) => {
    let response
    let url
    given(/^author's name is (.*)$/, (authorNames) => {
      url = createAuthorQuery(authorNames)
    })
    when("user queries posts", async () => {
      response = await axios.get(url)
    })
    then("the server should return an error", () => {
      expect(response.status).toEqual(400)
      expect(response).toMatchErrorMessageSchema()
    })
  })
  test("Invalid title query", ({ given, when, then }) => {
    let response
    let url
    given(/^title is (.*)$/, (title) => {
      url = createPostTitle(title)
    })

    when("user queries posts", async () => {
      response = await axios.get(url)
    })

    then("the server should return an error", () => {
      expect(response.status).toEqual(400)
      expect(response).toMatchErrorMessageSchema()
    })
  })
  test("Invalid categories query", ({ given, when, then }) => {
    let response
    let url
    given(/^query categories are (.*)$/, (category) => {
      url = createCategoryQuery(category)
    })

    when("user queries posts", async () => {
      response = await axios.get(url)
    })

    then("the server should return an error", () => {
      expect(response.status).toEqual(400)
      expect(response).toMatchErrorMessageSchema()
    })
  })
  test("Invalid tags query", ({ given, when, then }) => {
    let response
    let url
    given(/^query tags are (.*)$/, (tag) => {
      url = createTagQuery(tag)
    })

    when("user queries posts", async () => {
      response = await axios.get(url)
    })

    then("the server should return an error", () => {
      expect(response.status).toEqual(400)
      expect(response).toMatchErrorMessageSchema()
    })
  })
})
