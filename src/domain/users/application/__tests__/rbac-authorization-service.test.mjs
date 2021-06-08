import RBACAuthorizationService from "../rbac-authorization-service"

describe("rabc authorization service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const userRepositoryMock = {
    findById: jest.fn(),
  }
  const userMock = { getRole: jest.fn() }

  it("can returns false if user has unsupported role", async () => {
    userMock.getRole.mockReturnValue({ getValue: () => "unsupported" })
    userRepositoryMock.findById.mockReturnValue(userMock)
    const authorizationService = new RBACAuthorizationService(
      1,
      userRepositoryMock
    )
    const isAuthorized = await authorizationService.can("delete:post", {
      userId: 1,
    })
    expect(isAuthorized).toBeFalsy()
  })
  it("can returns true when user is authorized to perform a conditional action", async () => {
    userMock.getRole.mockReturnValue({ getValue: () => "writer" })
    userRepositoryMock.findById.mockReturnValue(userMock)
    const authorizationService = new RBACAuthorizationService(
      1,
      userRepositoryMock
    )
    const isAuthorized = await authorizationService.can("user:delete", {
      requesterId: 1,
      userId: 1,
    })

    expect(isAuthorized).toBeTruthy()
  })
  it("can returns true when user is authorized to perform an unconditional action", async () => {
    userMock.getRole.mockReturnValue({ getValue: () => "writer" })
    userRepositoryMock.findById.mockReturnValue(userMock)
    const authorizationService = new RBACAuthorizationService(
      1,
      userRepositoryMock
    )
    const isAuthorized = await authorizationService.can("post:create")

    expect(isAuthorized).toBeTruthy()
  })
})
