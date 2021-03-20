import MockRouter from "koa-router"
jest.mock("../api/v0/docs", () => ({
  __esModule: true,
  makeDocsRouter: () => new MockRouter(),
  makeDocsUiRouter: () => new MockRouter(),
}))

import Koa from "koa"
import http from "http"
import makeApiRouter from "../api/"
import { startServer, forceStopServer } from "../web/server"

import request from "supertest"

const supertestCaptureEnd = (done) => {
  return (err, _) => {
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
    it("Content-Type is json", (done) => {
      request(server)
        .get("/api/v0/posts")
        .expect("Content-Type", /json/)
        .end(supertestCaptureEnd(done))
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
