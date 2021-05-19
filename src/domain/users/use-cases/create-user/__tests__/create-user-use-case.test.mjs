import CreateUserUseCase from "../create-user-use-case"
import { UserAlreadyExists } from "../create-user-errors"
import { InvalidUserData } from "../../../domain/user-errors"

describe("create user use case", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const userRepositoryMock = {
    save: jest.fn(),
    exists: jest.fn(),
  }
  const encryptionService = {
    hash: jest.fn(),
    generateSalt: jest.fn(),
  }
  it("creates a new user", async () => {
    const createUserDTO = {
      name: "bob",
      email: "bob@bob.com",
      password: "bobspassword",
    }
    userRepositoryMock.exists.mockReturnValue(false)
    encryptionService.hash.mockReturnValue("hash")
    encryptionService.generateSalt.mockReturnValue("salt")

    const createUserUseCase = new CreateUserUseCase(
      userRepositoryMock,
      encryptionService
    )
    await createUserUseCase.execute(createUserDTO)

    expect(userRepositoryMock.save).toBeCalledWith({
      email: { email: "bob@bob.com" },
      encryptedPassword: { hash: "hash" },
      salt: { salt: "salt" },
    })
  })
  it("throws a UserAlredyExist when user already exists", async () => {
    const createUserDTO = {
      name: "bob",
      email: "bo1b@bob.com",
      password: "bobspassword",
    }

    userRepositoryMock.exists.mockReturnValue(true)
    const createUserUseCase = new CreateUserUseCase(
      userRepositoryMock,
      encryptionService
    )

    await expect(createUserUseCase.execute(createUserDTO)).rejects.toThrow(
      UserAlreadyExists
    )
  })
  it("throws an InvalidUserData when email is invalid", async () => {
    const createUserDTO = {
      name: "bob",
      email: "bob",
      password: "bobpassword",
    }
    const createUserUseCase = new CreateUserUseCase(
      userRepositoryMock,
      encryptionService
    )

    await expect(createUserUseCase.execute(createUserDTO)).rejects.toThrow(
      InvalidUserData
    )
  })
  it("hashes user password", async () => {
    const createUserDTO = {
      name: "bob",
      email: "bob@bob.com",
      password: "bobbobob",
    }
    userRepositoryMock.exists.mockReturnValue(false)
    encryptionService.hash.mockReturnValue("hashed")
    encryptionService.generateSalt.mockReturnValue("salt")

    const createUserUseCase = new CreateUserUseCase(
      userRepositoryMock,
      encryptionService
    )

    await createUserUseCase.execute(createUserDTO)

    expect(userRepositoryMock.save).toBeCalledWith(
      expect.objectContaining({
        encryptedPassword: { hash: "hashed" },
        salt: { salt: "salt" },
      })
    )
  })
})
