import GetAuthenticationTokenService from "../get-authentication-token-service"
import { InvalidUserCredentails, UserUnauthorized } from "../errors"

const createGetAuthenticationTokenDTO = () => {
  return {
    email: "bob@bob.com",
    password: "12345678",
  }
}

const createGetAuthenticationTokenService = (
  userRepository,
  encryptionService,
  authTokenService
) => {
  return new GetAuthenticationTokenService(
    userRepository,
    encryptionService,
    authTokenService
  )
}

const createUserStub = () => {
  return {
    getId: () => {
      return {
        getValue: () => {
          return "1"
        },
      }
    },
    getSalt: () => {
      return {
        getValue: () => {
          return "abc"
        },
      }
    },
    getEncryptedPassword: () => {
      return {
        getValue: () => {
          return "abc"
        },
      }
    },
  }
}

describe("login user use case", () => {
  const userRepository = {
    findByEmail: jest.fn(),
  }
  const encryptionService = {
    hash: jest.fn(),
  }
  const authTokenService = {
    generateToken: jest.fn(),
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("returns authentication token", async () => {
    encryptionService.hash.mockReturnValue("abc")
    const useCase = createGetAuthenticationTokenService(
      userRepository,
      encryptionService,
      authTokenService
    )
    const getAuthenticationTokenDTO = createGetAuthenticationTokenDTO()
    userRepository.findByEmail.mockReturnValue(createUserStub())
    const token = await useCase.execute(getAuthenticationTokenDTO)
    expect(token).toMatchObject({
      token: /\w+/,
    })
  })
  it("throws an error if user does not exist", () => {
    const getAuthenticationTokenDTO = createGetAuthenticationTokenDTO()
    userRepository.findByEmail.mockReturnValue(null)
    const service = createGetAuthenticationTokenService(
      userRepository,
      encryptionService,
      authTokenService
    )

    expect(service.execute(getAuthenticationTokenDTO)).rejects.toThrow(
      InvalidUserCredentails
    )
  })
  it("throws an error if user passed incorrect password", () => {
    encryptionService.hash.mockReturnValue("eee")
    const getAuthenticationTokenDTO = createGetAuthenticationTokenDTO()
    userRepository.findByEmail.mockReturnValue(createUserStub())
    const service = createGetAuthenticationTokenService(
      userRepository,
      encryptionService,
      authTokenService
    )

    expect(service.execute(getAuthenticationTokenDTO)).rejects.toThrow(
      UserUnauthorized
    )
  })
})
