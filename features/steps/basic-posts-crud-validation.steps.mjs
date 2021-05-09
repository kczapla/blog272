import { defineFeature, loadFeature } from "jest-cucumber"
import { matchers } from "jest-json-schema"
expect.extend(matchers)

import { errorResponseSchema } from "./response-schemas"
import { readPost } from "./api-client"

const feature = loadFeature("./features/basic-posts-crud-validation.feature")

defineFeature(feature, (test) => {
  test("Read non-existent post", ({ when, then }) => {
    let response
    when("Bob reads non-existent post", async () => {
      response = await readPost("0")
    })

    then(
      "server should return fail status and inform user that it didn't found a resource",
      () => {
        expect(response.status).toEqual(404)
        expect(response.data).toMatchSchema(errorResponseSchema)
      }
    )
  })
})
