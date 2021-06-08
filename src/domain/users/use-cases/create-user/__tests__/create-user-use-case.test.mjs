import CreateUserUseCase from "../create-user-use-case"
import { UserAlreadyExists, InvalidUserData } from "../create-user-errors"

describe("create user use case", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const userRepositoryMock = {
    nextIdentity: jest.fn(),
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
    userRepositoryMock.nextIdentity.mockReturnValue("1111")
    userRepositoryMock.exists.mockReturnValue(false)
    encryptionService.hash.mockReturnValue("hash")
    encryptionService.generateSalt.mockReturnValue("salt")

    const createUserUseCase = new CreateUserUseCase(
      userRepositoryMock,
      encryptionService
    )
    await createUserUseCase.execute(createUserDTO)

    expect(userRepositoryMock.save).toBeCalledWith({
      id: { id: "1111" },
      name: { name: "bob" },
      email: { email: "bob@bob.com" },
      encryptedPassword: { hash: "hash" },
      salt: { salt: "salt" },
      role: { role: "writer" },
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
