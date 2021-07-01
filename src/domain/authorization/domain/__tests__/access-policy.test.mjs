import AccessPolicy from "../access-policy"
import InvalidAuthorizationData from "../invalid-authorization-data"

describe("create function", () => {
  it.each([null, undefined, ""])(
    "throws an error when action name is invalid",
    (actionName) => {
      expect(() => AccessPolicy.create(actionName, () => true)).toThrow(
        InvalidAuthorizationData
      )
    }
  )
  it.each([1, "not a function", null, undefined])(
    "throws an error when policy condition is not a function",
    (policyCondition) => {
      expect(() => AccessPolicy.create("name:name", policyCondition)).toThrow(
        InvalidAuthorizationData
      )
    }
  )
})
