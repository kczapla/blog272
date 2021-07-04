import AccessPolicyCollection from "../access-policy-collection"

describe("isAnyPolicyCompliant function", () => {
  it("returns true if any policy is compliant", () => {
    const actionPolicyCollection = AccessPolicyCollection.create()
    actionPolicyCollection.add(() => false)
    actionPolicyCollection.add(() => false)
    actionPolicyCollection.add((user, res) => user.id === res.id)

    const user = { id: "1111" }
    const resource = { id: "1111" }
    expect(
      actionPolicyCollection.isAnyPolicyCompliant(user, resource)
    ).toBeTruthy()
  })
  it("returns false if collection is empty", () => {
    const actionPolicyCollection = AccessPolicyCollection.create()
    expect(actionPolicyCollection.isAnyPolicyCompliant()).toBeFalsy()
  })
})

describe("empty function", () => {
  it("returns true if no policies in the collection", () => {
    const actionPolicyCollection = AccessPolicyCollection.create()
    expect(actionPolicyCollection.empty()).toBeTruthy()
  })
  it("returns false if policies are in the collection", () => {
    const actionPolicyCollection = AccessPolicyCollection.create()
    actionPolicyCollection.add(() => false)
    expect(actionPolicyCollection.empty()).toBeFalsy()
  })
})
