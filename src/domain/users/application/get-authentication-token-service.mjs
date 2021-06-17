import { Email, Password, UserError } from "../domain"
import { InvalidUserCredentails, UserUnauthorized } from "./errors"

class GetAuthenticationTokenService {
  constructor(userRepository, encryptionService, authTokenService) {
    this.userRepository = userRepository
    this.encryptionService = encryptionService
    this.authTokenService = authTokenService
  }

  async execute(getAuthenticationTokenDTO) {
    let email, password
    try {
      email = Email.create(getAuthenticationTokenDTO.email)
      password = Password.create(getAuthenticationTokenDTO.password)
    } catch (e) {
      if (e instanceof UserError) {
        throw new InvalidUserCredentails(e.message)
      }
      throw e
    }

    const user = await this.userRepository.findByEmail(email.getValue())
    if (user === null || user === undefined) {
      throw new InvalidUserCredentails(`User with ${email} does not exist.`)
    }

    const hash = this.encryptionService.hash(
      password.getValue(),
      user.getSalt().getValue()
    )

    if (hash !== user.getEncryptedPassword().getValue()) {
      throw new UserUnauthorized()
    }
    return {
      token: this.authTokenService.generateToken(user.getId().getValue()),
    }
  }
}

export default GetAuthenticationTokenService
