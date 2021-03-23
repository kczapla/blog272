import MockRouter from "koa-router"
jest.mock("../api/v0/docs", () => ({
  __esModule: true,
  makeDocsRouter: () => new MockRouter(),
  makeDocsUiRouter: () => new MockRouter(),
}))

import Koa from "koa"
import http from "http"
import makeApiRouter from "../api/"

import request from "supertest"

const createPost = () => console.log("create post")
const deletePost = () => console.log("delete post")

const matchesAuthorInPostResponseBody = (response) => {
  expect(response.body.author).toHaveProperty("id")
  expect(response.body.author).toHaveProperty("name")
}

const matchesCommentInPostResponseBody = (commentId) => {
  return (response) => {
    const comments = response.body
    expect(comments[commentId]).toHaveProperty("id")
    expect(comments[commentId]).toHaveProperty("author")
    expect(comments[commentId]).toHaveProperty("date")
    expect(comments[commentId]).toHaveProperty("content")
  }
}

const matchesPostResponseBody = (response) => {
  expect(response.body).toHaveProperty("id")
  expect(response.body).toHaveProperty("publish_date")
  expect(response.body).toHaveProperty("author")
  expect(response.body).toHaveProperty("categories")
  expect(response.body).toHaveProperty("tags")
  expect(response.body).toHaveProperty("title")
  expect(response.body).toHaveProperty("content")
  expect(response.body).toHaveProperty("comments")
}

const matchesAuthorFieldTypesInPostResponseBody = (response) => {
  const author = response.body.author
  expect(author.id).toEqual(expect.any(Number))
  expect(author.name).toBeInstanceOf(String)
}

const matchesCommentAuthorFieldTypesInPostResponseBody = (commentId) => {
  return (response) => {
    const comment = response.body.comments[commentId]
    expect(comment.author.id).toEqual(expect.any(Number))
    expect(comment.author.name).toBeInstanceOf(String)
  }
}

const matchesCommentFieldTypesInPostResponseBody = (commentId) => {
  return (response) => {
    const comment = response.body.comments[commentId]
    expect(comment.id).toEqual(expect.any(Number))
    expect(comment.author).toBeInstanceOf(Object)
    expect(comment.date).toBeInstanceOf(String)
    expect(comment.content).toBeInstanceOf(String)
  }
}

const matchesPostBodyResponseFields = (response) => {
  const body = response.body
  expect(body.id).toEqual(expect.any(Number))
  expect(body.publish_date).toBeInstanceOf(String)
  expect(body.author).toBeInstanceOf(Object)
  expect(body.categories).toBeInstanceOf(Array)
  expect(body.tags).toBeInstanceOf(Array)
  expect(body.title).toBeInstanceOf(String)
  expect(body.content).toBeInstanceOf(String)
  expect(body.comments).toBeInstanceOf(Array)
}

const supertestCaptureEnd = (done) => {
  return (err) => {
    if (err) done.fail(err)
    else done()
  }
}

describe("posts endpoint", () => {
  let app, server

  beforeAll((done) => {
    app = new Koa()
    app.use(makeApiRouter().routes())
    server = http.createServer(app.callback()).listen(done)
  })

  afterAll((done) => {
    server.close(done)
  })

  describe("GET", () => {
    beforeAll(() => {
      createPost()
    })

    afterAll(() => {
      deletePost()
    })

    it("Content-Type is json", (done) => {
      request(server)
        .get("/api/v0/posts")
        .expect("Content-Type", /json/)
        .end(supertestCaptureEnd(done))
    })

    it("returns post", (done) => {
      request(server)
        .get("/api/v0/posts/1")
        .then(matchesPostResponseBody)
        .then(matchesAuthorFieldTypesInPostResponseBody)
        .then(matchesCommentFieldTypesInPostResponseBody(1))
        .then(matchesCommentAuthorFieldTypesInPostResponseBody(1))
        .catch((err) => {
          console.log("catch context")
          done(err)
        })
    })
  })
  describe("PUT", () => {
    it("returns 200", (done) => {
      request(server)
        .put("/api/v0/posts/1")
        .expect(200)
        .end(supertestCaptureEnd(done))
    })
  })
  describe("DELETE", () => {
    it("returns 200", (done) => {
      request(server)
        .delete("/api/v0/posts/1")
        .expect(200)
        .end(supertestCaptureEnd(done))
    })
    it("returns 404", (done) => {
      request(server)
        .delete("/api/v0/posts")
        .expect(404)
        .end(supertestCaptureEnd(done))
    })
  })
})
