import DeleteUserUseCase from "../delete-user-use-case"
import { InvalidUserId } from "../delete-user-errors.mjs"

describe("delete user use case", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const userRepositoryMock = {
    deleteById: jest.fn(),
  }

  it("deletes user", async () => {
    const deleteUserUseCase = new DeleteUserUseCase(userRepositoryMock)
    await deleteUserUseCase.execute({ userId: "1" })

    expect(userRepositoryMock.deleteById).toHaveBeenCalledWith("1")
  })
  it.each([null, undefined, 1, ""])(
    "throws when user id is invalid",
    async (invalidId) => {
      const deleteUserUseCase = new DeleteUserUseCase(userRepositoryMock)

      const deleteUserDto = { userId: invalidId }
      await expect(deleteUserUseCase.execute(deleteUserDto)).rejects.toThrow(
        InvalidUserId
      )
    }
  )
})
