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
    describe("and title query parameter is 'Building'", () => {
      describe("and there are three posts that have 'Building' in their title", () => {
        let response
        beforeAll(async () => {
          response = await request(server).get("/api/v0/posts?title=Building")
        })
        it("then response status is 200", () => {
          expect(response.status).toEqual(200)
        })
        it("then response Content-Type is json", () => {
          expect(response).contentTypeToBeJson()
        })
        it("then response body is an array of posts", () => {
          expect(response.body).toBeAnArrayOfPosts()
        })
        it("then response body array has three elements", () => {
          expect(response.body).toHaveLength(3)
        })
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
    describe("and categories query parameter is [home, plants]", () => {
      describe("and there are three posts with one these categories", () => {
        let response
        beforeAll(async () => {
          response = await request(server).get(
            "/api/v0/posts?categories=home&categories=plants"
          )
        })
        it("then response status is 200", () => {
          expect(response.status).toEqual(200)
        })
        it("then response Content-Type is json", () => {
          expect(response).contentTypeToBeJson()
        })
        it("then response body is an array of posts", () => {
          expect(response.body).toBeAnArrayOfPosts()
        })
        it("then response body array has three elements", () => {
          expect(response.body).toHaveLength(3)
        })
      })
    })
    describe("and categories query paramer is [build2, cmake]", () => {
      describe("and there are not posts with these categories", () => {
        let response
        beforeAll(async () => {
          response = await request(server).get(
            "/api/v0/posts?categories=build2&categories=cmake"
          )
        })
        it("then response status is 200", () => {
          expect(response.status).toEqual(200)
        })
        it("then response Content-Type is json", () => {
          expect(response).contentTypeToBeJson()
        })
        it("then response body is an empty array", () => {
          expect(response.body).toBeNull()
        })
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
    describe("and tag query parameter is [home, plants]", () => {
      describe("and there are three posts with one these tag", () => {
        let response
        beforeAll(async () => {
          response = await request(server).get(
            "/api/v0/posts?tags=home&tags=plants"
          )
        })
        it("then response status is 200", () => {
          expect(response.status).toEqual(200)
        })
        it("then response Content-Type is json", () => {
          expect(response).contentTypeToBeJson()
        })
        it("then response body is an array of posts", () => {
          expect(response.body).toBeAnArrayOfPosts()
        })
        it("then response body array has three elements", () => {
          expect(response.body).toHaveLength(3)
        })
      })
    })
    describe("and tags query paramer is [build2, cmake]", () => {
      describe("and there are not posts with these tags", () => {
        let response
        beforeAll(async () => {
          response = await request(server).get(
            "/api/v0/posts?tags=build2&tags=cmake"
          )
        })
        it("then response status is 200", () => {
          expect(response.status).toEqual(200)
        })
        it("then response Content-Type is json", () => {
          expect(response).contentTypeToBeJson()
        })
        it("then response body is an empty array", () => {
          expect(response.body).toBeNull()
        })
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
    describe("and published_after query parameter is 2021-01-01", () => {
      describe("and published_before query paramter is 2021-01-31", () => {
        describe("and there are three posts in this time span", () => {
          let response
          beforeAll(async () => {
            const veryLongTag = "a".repeat(70)
            response = await request(server).get(
              `/api/v0/posts/1?tags=${veryLongTag}`
            )
          })
          it("then response is 200", () => {
            expect(response.status).toEqual(200)
          })
          it("then response Content-Type is json", () => {
            expect(response).contentTypeToBeJson()
          })
          it("then response body is an array of posts", () => {
            expect(response.body).toBeAnArrayOfPosts()
          })
          it("then response body array has three elements", () => {
            expect(response.body).toHaveLength(3)
          })
        })
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
