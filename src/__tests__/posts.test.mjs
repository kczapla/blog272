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

const supertestCaptureEnd = (done) => {
  return (err) => {
    if (err) done.fail(err)
    else done()
  }
}

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
    beforeAll(() => {
      createPost()
    })

    afterAll(() => {
      deletePost()
    })

    it("then response status is 200", async () => {
      const response = await request(server).get("/api/v0/posts/1")
      expect(response.status).toEqual(200)
    })
    it("then response Content-Type is json", (done) => {
      request(server)
        .get("/api/v0/posts")
        .expect("Content-Type", /json/)
        .end(supertestCaptureEnd(done))
    })

    it("then response body matches post body schema", async () => {
      const response = await request(server).get("/api/v0/posts/1")
      expect(response).toMatchPostResponseBodySchema()
      expect(response).toMatchPostAuthorResponseBody()
      expect(response).toMatchNthPostCommentResponseBody(0)
    })
  })
})
