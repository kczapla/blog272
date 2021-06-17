import DeleteUserService from "../delete-user-service"
import { InvalidUserId } from "../errors"

describe("delete user use case", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const userRepositoryMock = {
    deleteById: jest.fn(),
  }

  it("deletes user", async () => {
    const deleteUserService = new DeleteUserService(userRepositoryMock)
    await deleteUserService.execute({ userId: "1" })

    expect(userRepositoryMock.deleteById).toHaveBeenCalledWith("1")
  })
  it.each([null, undefined, 1, ""])(
    "throws when user id is invalid",
    async (invalidId) => {
      const deleteUserService = new DeleteUserService(userRepositoryMock)

      const deleteUserDto = { userId: invalidId }
      await expect(deleteUserService.execute(deleteUserDto)).rejects.toThrow(
        InvalidUserId
      )
    }
  )
})
