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

describe("Given /posts end-point", () => {
  let app, server

  beforeAll((done) => {
    app = new Koa()
    app.use(makeApiRouter().routes())
    server = http.createServer(app.callback()).listen(done)
  })

  afterAll((done) => {
    server.close(done)
  })

  describe("when sending GET request", () => {
    describe("and no query parameters", () => {
      let response
      beforeAll(async () => {
        response = await request(server).get("/api/v0/posts")
      })
      it("then response status is 200", () => {
        expect(response.status).toEqual(200)
      })
      it("then response body is an array of posts", () => {
        expect(response.body).toBeAnArrayOfPosts()
      })
    })
    describe("and author query parameter is equal to 'john'", () => {
      describe("and 'john' wrote two posts", () => {
        let response
        beforeAll(async () => {
          response = await request(server).get("/api/v0/posts?author=john")
        })
        it("then response status is 200", () => {
          expect(response.status).toEqual(200)
        })
        it("then response body is an array of posts with two elements", () => {
          expect(response.body).toBeAnArrayOfPosts()
        })
        it("then posts author is 'john'", () => {
          expect(response.body.author.name).toBe("john")
        })
      })
    })
    describe("and author query parameter size is >100", () => {
      let response
        beforeAll(async () => {
          response = await request(server).get("/api/v0/posts?author=john")
        })
        it("then response status is 400", () => {
          expect(response.status).toEqual(400)
        })
        it("then response body matches error message schema", () => {
          expect(response.body).toMatchErrorMessageSchema()
        })
    })
    describe("and resource with given id exists", () => {
      let response
      beforeAll(async () => {
        response = await request(server).get("/api/v0/posts/1")
      })
      it("then response status is 200", () => {
        expect(response.status).toEqual(200)
      })

      it("then response Content-Type is json", () => {
        expect(response).contentTypeToBeJson()
      })
      it("then response body matches post body schema", () => {
        expect(response).toMatchPostResponseBodySchema()
        expect(response).toMatchPostAuthorResponseBody()
        expect(response).toMatchNthPostCommentResponseBody(0)
      })
    })
    describe("and resource with given id doesn't exist", () => {
      let response
      beforeAll(async () => {
        response = await request(server).get("/api/v0/posts/1")
      })
      it("then response status is 404", () => {
        expect(response.status).toEqual(404)
      })
      it("then response body matches error message schema", () => {
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
  })
})
