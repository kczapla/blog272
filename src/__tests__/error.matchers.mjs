import { makeObjectFieldMatcher } from "./utils"

expect.extend({
  toMatchErrorMessageSchema(responseBody) {
    const expectResponseBodyField = makeObjectFieldMatcher(responseBody)
    try {
      expectResponseBodyField("code").toBeInstanceOf("string")
      expectResponseBodyField("message").toBeInstanceOf("string")
    } catch (error) {
      return { pass: false, message: () => error }
    }
    return { pass: true, message: () => "" }
  },
})
