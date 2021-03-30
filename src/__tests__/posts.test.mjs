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

  describe("Given 50 posts on the blog", () => {
    describe("And 10 are posted by john", () => {
      describe("And 5 has 'Building' in their title", () => {
        describe("And 10 has one or more category from [home, plants]", () => {
          describe("And 5 has one more tag from [cmake, markdown]", () => {
            describe("And 20 were posted in January 2021", () => {
              describe("Given url /post", () => {
                describe("When sending GET request", () => {
                  it("Then recieve an array of 50 posts", async () => {
                    const url = "/api/v0/posts"
                    const response = await request(server).get(url)
                    expect(response.status).toEqual(200)
                    expect(response.header["content-type"]).toMatch(/json/)
                    expect(response.body).toHaveLength(50)
                    expect(response.body).toBeAnArrayOfPosts()
                  })
                })
              })
              describe("Given url /posts?author=john", () => {
                describe("When sending GET request", () => {
                  it("Then recieve an array of 10 posts", async () => {
                    const url = "/api/v0/posts?author=john"
                    const response = await request(server).get(url)
                    expect(response.status).toEqual(200)
                    expect(response.header["content-type"]).toMatch(/json/)
                    expect(response.body).toHaveLength(10)
                    expect(response.body).eachPostAuthorEquals({
                      id: 1,
                      name: "john",
                    })
                  })
                })
              })
              describe("Given url /posts?title=Building", () => {
                describe("When sending GET request", () => {
                  it("Then recieve an array of 5 posts", async () => {
                    const url = "/api/v0/posts?title=Building"
                    const response = await request(server).get(url)
                    expect(response.status).toEqual(200)
                    expect(response.header["content-type"]).toMatch(/json/)
                    expect(response.body).toHaveLength(5)
                    expect(response.body).arrayToContainABCInTitleOfEachPost(
                      "Building"
                    )
                  })
                })
              })
              describe("Given url /posts?categories=home&categories=plants", () => {
                describe("When sending GET request", () => {
                  it("Then recieve an array of 10 posts", async () => {
                    const url =
                      "/api/v0/posts?categories=home&categories=plants"
                    const response = await request(server).get(url)
                    expect(response.status).toEqual(200)
                    expect(response.header["content-type"]).toMatch(/json/)
                    expect(response.body).toHaveLength(10)
                    expect(
                      response.body
                    ).arrayToHaveOneOfTheCategoryInEachPost(["home", "plants"])
                  })
                })
              })
              describe("Given url /posts?tags=cmake&tags=markdown", () => {
                describe("When sending GET request", () => {
                  it("Then recieve an array of 5 posts", async () => {
                    const url = "/api/v0/posts?tags=cmake&tags=markdown"
                    const response = await request(server).get(url)
                    expect(response.status).toEqual(200)
                    expect(response.header["content-type"]).toMatch(/json/)
                    expect(response.body).toHaveLength(10)
                    expect(response.body).arrayToHaveOneOfTheTagInEachPost([
                      "cmake",
                      "markdown",
                    ])
                  })
                })
              })
              describe("Given url /posts?published_after=2021-01-01&published_before=2021-02-01", () => {
                describe("When sending GET request", () => {
                  it("Then recieve an array of 20 posts published in January 2021", async () => {
                    const url =
                      "/api/v0/posts?published_after=2021-01-01&published_before=2021-02-01"
                    const response = await request(server).get(url)
                    expect(response.status).toEqual(200)
                    expect(response.header["content-type"]).toMatch(/json/)
                    expect(response.body).toHaveLength(10)
                    expect(response.body).postsArrayIsPublishedWithinRange(
                      new Date("2021-01-01"),
                      new Date("2021-02-01")
                    )
                  })
                })
              })
              describe("Given url /posts/1", () => {
                describe("When sending GET request", () => {
                  it("Then recieve post with id equal to one", async () => {
                    const url = "/api/v0/posts/1"
                    const response = await request(server).get(url)
                    expect(response.status).toEqual(200)
                    expect(response.header["content-type"]).toMatch(/json/)
                    expect(response.body.id).toEqual(1)
                  })
                })
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
            })
          })
        })
      })
    })
  })
  describe("Given url /posts?author=<string that has over 100 chars>", () => {
    describe("When sending GET request", () => {
      it("Then recieve an error", async () => {
        const veryLongAuthorName = "a".repeat(120)
        const response = await request(server).get(
          `/api/v0/posts?author=${veryLongAuthorName}`
        )
        expect(response.status).toEqual(400)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response).toMatchErrorMessageSchema()
      })
    })
  })
  describe("Given url /posts?author=jo#$n", () => {
    describe("When sending GET request", () => {
      it("Then recieve an error", async () => {
        const response = await request(server).get("/api/v0/posts?author=jo#$n")
        expect(response.status).toEqual(400)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
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
  describe("Given url /posts?title=<string that has over 255 chars>", () => {
    describe("When sending GET request", () => {
      it("Then recieve an error", async () => {
        const veryLongTitle = "a".repeat(300)
        const response = await request(server).get(
          `/api/v0/posts?title=${veryLongTitle}`
        )
        expect(response.status).toEqual(400)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
  })
  describe("Given url /posts?categories=", () => {
    describe("When sending GET request", () => {
      it("Then recieve an error", async () => {
        const response = await request(server).get("/api/v0/posts?categories=")
        expect(response.status).toEqual(400)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
  })
  describe("Given url /posts?categories=<category that is over 60 chars", () => {
    describe("When sending GET request", () => {
      it("Then recieve an error", async () => {
        const veryLongCategory = "a".repeat(70)
        const response = await request(server).get(
          `/api/v0/posts/1?categories=${veryLongCategory}`
        )
        expect(response.status).toEqual(400)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
  })
  describe("Given url /posts?tags=", () => {
    describe("When sending GET request", () => {
      it("Then recieve an error", async () => {
        const response = await request(server).get("/api/v0/posts?tags=")
        expect(response.status).toEqual(400)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
  })
  describe("Given url /posts?tags=<tag that is over 60 chars", () => {
    describe("When sending GET request", () => {
      it("Then recieve an error", async () => {
        const veryLongCategory = "a".repeat(70)
        const response = await request(server).get(
          `/api/v0/posts/1?tags=${veryLongCategory}`
        )
        expect(response.status).toEqual(400)
        expect(response.header["content-type"]).toMatch(/json/)
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
  })
  describe("Given url /posts", () => {
    describe("And post object in request body", () => {
      describe("When sending POST request", () => {
        it("Then create post", async () => {
          const postBody = makePostRequestBody()
          const response = await request(server).post("/posts").send(postBody)
          expect(response.status).toEqual(201)
          expect(response.header["content-location"]).toEqual(/\/posts\/\d+/)
          expect(response.body).toMatchPostResponseBody()
        })
      })
    })
  })
  describe("Given url /posts", () => {
    describe.each(["author", "title", "categories", "tags", "content"])(
      "And post object in request body is missing %p field",
      (fieldName) => {
        describe("When sending POST request", () => {
          it("Then recieve an error message", async () => {
            const postBody = makePostRequestBody()
            delete postBody[fieldName]
            const response = await request(server).post("/posts").send(postBody)
            expect(response.status).toEqual(400)
            expect(response.body).toMatchErrorMessageSchema()
          })
        })
      }
    )
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
