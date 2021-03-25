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
