import AuthorizationService from "../authorization-service"
import NotFoundError from "../not-found-error"
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

    await expect(
      authService.canUserDoActionOnPost("1", "test:delete", "1")
    ).resolves.toBeTruthy()
  })
  it("throws an error if action is unsupported", async () => {
    const accessPolicies = AccessPolicyCollection.create()
    accessPoliciesRepository.findByActionName.mockReturnValue(accessPolicies)
    const authService = new AuthorizationService(
      usersQuery,
      postsQuery,
      accessPoliciesRepository
    )

    await expect(() =>
      authService.canUserDoActionOnPost()
    ).rejects.toThrowError()
  })
  it("throws an error if user with given id does not exist", async () => {
    accessPoliciesRepository.findByActionName.mockReturnValue({
      empty: () => false,
    })
    usersQuery.findById.mockReturnValue(null)

    const authService = new AuthorizationService(
      usersQuery,
      postsQuery,
      accessPoliciesRepository
    )

    await expect(() =>
      authService.canUserDoActionOnPost("1", "test", "1")
    ).rejects.toThrow(NotFoundError)
  })
  it("throws an error if posts with given id does not exist", async () => {
    accessPoliciesRepository.findByActionName.mockReturnValue({
      empty: () => false,
    })
    usersQuery.findById.mockReturnValue({ id: "aaaa" })
    postsQuery.findById.mockReturnValue(null)

    const authService = new AuthorizationService(
      usersQuery,
      postsQuery,
      accessPoliciesRepository
    )

    await expect(() =>
      authService.canUserDoActionOnPost("1", "test", "1")
    ).rejects.toThrow(NotFoundError)
  })
})
