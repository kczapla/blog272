import Authorizator from "../authorizator"
import AccessPolicy from "../access-policy"
import InvalidAuthorizationData from "../invalid-authorization-data"

describe("does allow function", () => {
  it("returns true if given action can be performed on the resource", () => {
    const authorizator = Authorizator.create()
    authorizator.addPolicy(AccessPolicy.create("test", () => true))
    expect(authorizator.doesAllow({}, "test", {})).toBeTruthy()
  })
  it("returns true if one of many action conditions is satisfied", () => {
    const authorizator = Authorizator.create()
    authorizator.addPolicy(AccessPolicy.create("test", () => false))
    authorizator.addPolicy(AccessPolicy.create("test", () => true))
    expect(authorizator.doesAllow({}, "test", {})).toBeTruthy()
  })
  it("returns an error if action is not supported", () => {
    const authorizator = Authorizator.create()
    expect(() => authorizator.doesAllow({}, "test", {})).toThrow(
      InvalidAuthorizationData
    )
  })
})
