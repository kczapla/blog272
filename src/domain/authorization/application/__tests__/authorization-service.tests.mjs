import AuthorizationService from "../authorization-service"
import { AccessPolicyCollection } from "../../domain"

describe("isActionOnPostAllowed function", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const usersQuery = {
    findById: jest.fn(),
  }
  const postsQuery = {
    findById: jest.fn(),
  }
  const accessPoliciesRepository = {
    findByActionName: jest.fn(),
  }
  it("returns true if user and post resources satisfy any action policy", async () => {
    usersQuery.findById.mockReturnValue({ id: "1234" })
    postsQuery.findById.mockReturnValue({ author: { id: "1234" } })

    const accessPolicies = AccessPolicyCollection.create()
    accessPolicies.add((user, resource) => user.id === resource.author.id)
    accessPoliciesRepository.findByActionName.mockReturnValue(accessPolicies)

    const authService = new AuthorizationService(
      usersQuery,
      postsQuery,
      accessPoliciesRepository
    )

    expect(
      authService.canUserDoActionOnPost("1", "test:delete", "1")
    ).toBeTruthy()
  })
  it("throws an error if action is unsupported", async () => {
    const accessPolicies = AccessPolicyCollection.create()
    accessPoliciesRepository.findByActionName.mockReturnValue(accessPolicies)
    const authService = new AuthorizationService(
      usersQuery,
      postsQuery,
      accessPoliciesRepository
    )

    expect(() => authService.canUserDoActionOnPost()).toThrowError()
  })
})
