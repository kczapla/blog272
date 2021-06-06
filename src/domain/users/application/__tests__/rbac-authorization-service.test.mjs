import RBACAuthorizationService from "../rbac-authorization-service"

describe("rabc authorization service", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const userRepositoryMock = {
    findUserById: jest.fn(),
  }
  const userMock = { getRole: jest.fn() }
  const roleMock = { can: jest.fn() }

  it("authorizes conditional actions", async () => {
    roleMock.can.mockReturnValue(() => true)
    userMock.getRole.mockReturnValue(roleMock)
    userRepositoryMock.findUserById.mockReturnValue(userMock)
    const authorizationService = new RBACAuthorizationService(
      1,
      userRepositoryMock
    )
    const isAuthorized = await authorizationService.can("delete-post", {
      userId: 1,
    })
    expect(isAuthorized).toBeTruthy()
  })
  it("authorizes conditionless action", async () => {
    roleMock.can.mockReturnValue(true)
    userMock.getRole.mockReturnValue(roleMock)
    userRepositoryMock.findUserById.mockReturnValue(userMock)
    const authorizationService = new RBACAuthorizationService(
      1,
      userRepositoryMock
    )
    const isAutorized = await authorizationService.can("create-user")
    expect(isAutorized).toBeTruthy()
  })
})
