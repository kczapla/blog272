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

import { makePostRequestBody } from "./utils"

describe("posts functional tests", () => {
  let app, server

  beforeAll((done) => {
    app = new Koa()
    app.use(makeApiRouter().routes())
    server = http.createServer(app.callback()).listen(done)
  })

  afterAll((done) => {
    server.close(done)
  })
})

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

  describe("Given url /posts?title=Animal", () => {
    describe("And there are no posts with such title", () => {
      describe("When sending GET request", () => {
        it("Then recieve an error", async () => {
          const response = await request(server).get(
            "/api/v0/posts?title=Animal"
          )
          expect(response.status).toEqual(200)
          expect(response.header["content-type"]).toMatch(/json/)
          expect(response.body).toBeNull()
        })
      })
    })
  })
  describe("Given url /posts/X", () => {
    describe("And post with id X exists", () => {
      describe("And new property values in post object in request body", () => {
        describe("When sending PUT request", () => {
          it("Then recieve updated post X", async () => {
            const expectedPostBody = makePostRequestBody()
            const postResponse = await request(server)
              .post("/posts")
              .send(expectedPostBody)

            expect(postResponse.status).toEqual(200)

            expectedPostBody.title = "New Title"
            expectedPostBody.categories = ["cat3", "cat4"]
            expectedPostBody.tags = ["tag3", "tag4"]
            expectedPostBody.content = "New Content"

            const putResponse = await request(server)
              .put(`/posts/${postResponse.body.id}`)
              .send(expectedPostBody)

            expect(putResponse.status).toEqual(200)
            expect(putResponse.header["content-location"]).toEqual(
              /\/posts\/\d+/
            )
            expect(putResponse.body).toMatchPostResponseBody()
            expect(putResponse.body).toMatchObject(expectedPostBody)
          })
        })
      })
    })
  })
  describe("Given url /posts/X", () => {
    describe("And post with an id X exists", () => {
      describe.each(["author", "title", "categories", "tags", "content"])(
        "And post object in request body is missing %p field",
        (fieldName) => {
          describe("When sending PUT request", () => {
            it("Then recieve an error message", async () => {
              const postBody = makePostRequestBody()
              delete postBody[fieldName]
              const response = await request(server)
                .put("/posts")
                .send(postBody)
              expect(response.status).toEqual(400)
              expect(response.body).toMatchErrorMessageSchema()
            })
          })
        }
      )
    })
  })
  describe("Given url /posts/X", () => {
    describe("And property title in the request body", () => {
      describe("When sending PATCH request", () => {
        it("Then recieve updated post in the response body", async () => {
          const expectedPostBody = makePostRequestBody()
          const postResponse = await request(server)
            .post("/posts")
            .send(expectedPostBody)
          expect(postResponse.status).toEqual(200)

          expectedPostBody.title = "New title"
          const patchResponse = await request(server)
            .patch(`/posts/${postResponse.body.id}`)
            .send(expectedPostBody)

          expect(patchResponse.status).toEqual(200)
          expect(patchResponse.header["content-location"]).toEqual(
            /\/posts\/\d+/
          )
          expect(patchResponse.body).toMatchPostResponseBody()
          expect(patchResponse.body).toMatchObject(expectedPostBody)
        })
      })
    })
  })
  describe("Given url /posts/1", () => {
    describe("When sending GET request", () => {
      describe("And post with id 1 doesn't exists", () => {
        it("Then recieve an error", async () => {
          const response = await request(server).get("/api/v0/posts/1")
          expect(response.status).toEqual(404)
          expect(response.body).toMatchErrorMessageSchema()
        })
      })
    })
  })
})
