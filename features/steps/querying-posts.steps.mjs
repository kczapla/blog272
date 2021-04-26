import { defineFeature, loadFeature } from "jest-cucumber"
import { ConvenientPostsQueryBuilder } from "./utils/posts-query-builder"
import posts from "./utils/api/posts"

const feature = loadFeature("./features/querying-posts.feature")

defineFeature(feature, (test) => {
  test("List all posts on the blog", ({ when, then }) => {
    let response
    when("users want to get all posts", async () => {
      response = await posts.index({})
    })
    then("the server should return posts", () => {
      expect(response.status).toEqual(200)
      expect(response.data).toBeAnArrayOfPosts()
    })
  })

  test("List all posts published by John", ({ when, then }) => {
    let response
    when("users want to get all posts published by John", async () => {
      const queryBuilder = new ConvenientPostsQueryBuilder()
      queryBuilder.addAuthors("John")
      response = await posts.index(queryBuilder.build())
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
        const queryBuilder = new ConvenientPostsQueryBuilder()
        queryBuilder.addTitles("Building")
        response = await posts.index(queryBuilder.build())
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
        const queryBuilder = new ConvenientPostsQueryBuilder()
        queryBuilder.addCategories("home,plants")
        response = await posts.index(queryBuilder.build())
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
      const queryBuilder = new ConvenientPostsQueryBuilder()
      queryBuilder.addTags("cmake,markdown")
      response = await posts.index(queryBuilder.build())
    })

    then("the server should return only posts with these tags", () => {
      expect(response.status).toEqual(200)
      expect(response.data).arrayToHaveOneOfTheTagInEachPost([
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
        const queryBuilder = new ConvenientPostsQueryBuilder()
        queryBuilder.addPublishedFromDates(`${year}-01-01`)
        queryBuilder.addPublishedToDates(`${year}-02-01`)
        const pattern = queryBuilder.build()
        response = await posts.index(pattern)
      }
    )

    then("the server should return posts published in that range", () => {
      expect(response.status).toEqual(200)
      expect(response.data).postsArrayIsPublishedWithinRange(
        new Date("2021-01-01"),
        new Date("2021-02-01")
      )
    })
  })

  test("No posts posts with given title were published", ({
    given,
    when,
    then,
  }) => {
    let query
    given(/^no posts with (.*) in the title were published$/, (title) => {
      const queryBuilder = new ConvenientPostsQueryBuilder()
      queryBuilder.addTitles(`${title}`)
      query = queryBuilder.build()
    })

    let response
    when("Bob searches", async () => {
      response = await posts.index(query)
    })

    then("the server should return an empty list", () => {
      expect(response.status).toEqual(200)
      expect(response.data).toBeNull()
    })
  })

  test("No posts published within given timeframe", ({ given, when, then }) => {
    let query
    given(
      /^no posts were have been published from (.*) to (.*)$/,
      (from, to) => {
        const queryBuilder = new ConvenientPostsQueryBuilder()
        queryBuilder.addPublishedFromDates(from)
        queryBuilder.addPublishedToDates(to)
        query = queryBuilder.build()
      }
    )

    let response
    when("Bob searches", async () => {
      response = await posts.index(query)
    })

    then("the server should return an empty list", () => {
      expect(response.status).toEqual(200)
      expect(response.data).toBeNull()
    })
  })
  test("No posts with given categories were published", ({
    given,
    when,
    then,
  }) => {
    let query
    given(
      /^no posts with (.*) category were published on the blog$/,
      (category) => {
        const queryBuilder = new ConvenientPostsQueryBuilder()
        queryBuilder.addCategories(category)
        query = queryBuilder.build()
      }
    )

    let response
    when("Bob searches", async () => {
      response = await posts.index(query)
    })

    then("the server should return an empty list", () => {
      expect(response.status).toEqual(200)
      expect(response.data).toBeNull()
    })
  })
  test("No posts with given tag were published", ({ given, when, then }) => {
    let query
    given(/^no posts with (.*) tag were published on the blog$/, (tag) => {
      const queryBuilder = new ConvenientPostsQueryBuilder()
      queryBuilder.addTags(tag)
      query = queryBuilder.build()
    })

    let response
    when("Bob searches", async () => {
      response = await posts.index(query)
    })

    then("the server should return an empty list", () => {
      expect(response.status).toEqual(200)
      expect(response.data).toBeNull()
    })
  })
  test("No posts were published by given author", ({ given, when, then }) => {
    let query
    given(
      /^no posts published by (.*) were published on the blog$/,
      (author) => {
        const queryBuilder = new ConvenientPostsQueryBuilder()
        queryBuilder.addAuthors(author)
        query = queryBuilder.build()
      }
    )

    let response
    when("Bob searches", async () => {
      response = await posts.index(query)
    })

    then("the server should return an empty list", () => {
      expect(response.status).toEqual(200)
      expect(response.data).toBeNull()
    })
  })
})
