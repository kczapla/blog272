import Salt from "../../domain/salt"
import User from "../../domain/user"
import Email from "../../domain/email"
import Password from "../../domain/password"
import EncryptedPassword from "../../domain/encrypted-password"
import { UserAlreadyExists } from "./create-user-errors"

class CreateUserUseCase {
  constructor(userRepository, encryptionService) {
    this.userRepository = userRepository
    this.encryptionService = encryptionService
  }

  async execute(createUserDTO) {
    const { email, password } = createUserDTO

    const userEmail = Email.create(email)
    const userAlreadyExist = await this.userRepository.exists(
      userEmail.getValue()
    )
    if (userAlreadyExist) {
      throw new UserAlreadyExists(email)
    }

    const userPassword = Password.create(password)
    const passwordSalt = Salt.create(this.encryptionService.generateSalt())
    const encryptedPassword = EncryptedPassword.create(
      this.encryptionService.hash(
        userPassword.getValue(),
        passwordSalt.getValue()
      )
    )

    const user = User.create(userEmail, encryptedPassword, passwordSalt)

    await this.userRepository.save(user)
  }
}

export default CreateUserUseCase
