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
            })
          })
        })
      })
    })
    describe("and author query parameter size is >100", () => {
      let response
      beforeAll(async () => {
        const veryLongAuthorName = "a".repeat(120)
        response = await request(server).get(
          `/api/v0/posts?author=${veryLongAuthorName}`
        )
      })
      it("then response status is 400", () => {
        expect(response.status).toEqual(400)
      })
      it("then response body matches error message schema", () => {
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
    describe("and author query parameter contains non-alphanumeric characters", () => {
      let response
      beforeAll(async () => {
        response = await request(server).get("/api/v0/posts?author=jo#hn")
      })
      it("then response status is 400", () => {
        expect(response.status).toEqual(400)
      })
      it("then response Content-Type is json", () => {
        expect(response).contentTypeToBeJson()
      })
      it("then response body matches error message schema", () => {
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
    describe("and title query parameter is 'Animal'", () => {
      describe("and there are not posts that have 'Animal' in their title", () => {
        let response
        beforeAll(async () => {
          response = await request(server).get("/api/v0/posts?title=Animal")
        })
        it("then response status is 200", () => {
          expect(response.status).toEqual(200)
        })
        it("then response Content-Type is json", () => {
          expect(response).contentTypeToBeJson()
        })
        it("then response body is empty", () => {
          expect(response.body).toBeNull()
        })
      })
    })
    describe("and title query parameter length is >255", () => {
      let response
      beforeAll(async () => {
        const veryLongTitle = "a".repeat(300)
        response = await request(server).get(
          `/api/v0/posts?title=${veryLongTitle}`
        )
      })
      it("then response status is 400", () => {
        expect(response.status).toEqual(400)
      })
      it("then response Content-Type is json", () => {
        expect(response).contentTypeToBeJson()
      })
      it("then response body is empty", () => {
        expect(response.body).toBeNull()
      })
    })
    describe("and categories query parameter has element that length is <1", () => {
      let response
      beforeAll(async () => {
        response = await request(server).get("/api/v0/posts/1?categories=")
      })
      it("then response status is 400", () => {
        expect(response.status).toEqual(400)
      })
      it("then response Content-Type is json", () => {
        expect(response).contentTypeToBeJson()
      })
      it("then response body matches error message schema", () => {
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
    describe("and categories query parameter has element that length is >60", () => {
      let response
      beforeAll(async () => {
        const veryLongCategory = "a".repeat(70)
        response = await request(server).get(
          `/api/v0/posts/1?categories=${veryLongCategory}`
        )
      })
      it("then response status is 400", () => {
        expect(response.status).toEqual(400)
      })
      it("then response Content-Type is json", () => {
        expect(response).contentTypeToBeJson()
      })
      it("then response body matches error message schema", () => {
        expect(response.body).toMatchErrorMessageSchema()
      })
    })

    describe("and tags query parameter has element that length is <1", () => {
      let response
      beforeAll(async () => {
        response = await request(server).get("/api/v0/posts/1?tags=")
      })
      it("then response status is 400", () => {
        expect(response.status).toEqual(400)
      })
      it("then response Content-Type is json", () => {
        expect(response).contentTypeToBeJson()
      })
      it("then response body matches error message schema", () => {
        expect(response.body).toMatchErrorMessageSchema()
      })
    })
    describe("and tags query parameter has element that length is >60", () => {
      let response
      beforeAll(async () => {
        const veryLongTag = "a".repeat(70)
        response = await request(server).get(
          `/api/v0/posts/1?tags=${veryLongTag}`
        )
      })
      it("then response status is 400", () => {
        expect(response.status).toEqual(400)
      })
      it("then response Content-Type is json", () => {
        expect(response).contentTypeToBeJson()
      })
      it("then response body matches error message schema", () => {
        expect(response.body).toMatchErrorMessageSchema()
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
