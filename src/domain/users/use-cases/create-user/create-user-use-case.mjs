import {
  Id,
  Name,
  Salt,
  User,
  Email,
  Password,
  EncryptedPassword,
  Role,
  UserError,
} from "../../domain"
import { UserAlreadyExists, InvalidUserData } from "./create-user-errors"

class CreateUserUseCase {
  constructor(userRepository, encryptionService) {
    this.userRepository = userRepository
    this.encryptionService = encryptionService
  }

  async execute(createUserDTO) {
    let userName
    let userEmail
    let userPassword

    try {
      const { name, email, password } = createUserDTO
      userName = Name.create(name)
      userEmail = Email.create(email)
      userPassword = Password.create(password)
    } catch (e) {
      if (e instanceof UserError) {
        throw new InvalidUserData(e.message)
      }
    }

    const userAlreadyExist = await this.userRepository.exists(
      userEmail.getValue()
    )
    if (userAlreadyExist) {
      throw new UserAlreadyExists(userEmail.getValue())
    }

    const passwordSalt = Salt.create(this.encryptionService.generateSalt())
    const encryptedPassword = EncryptedPassword.create(
      this.encryptionService.hash(
        userPassword.getValue(),
        passwordSalt.getValue()
      )
    )

    const id = Id.create(this.userRepository.nextIdentity())
    const role = Role.create("writer")

    const user = User.create(
      id,
      userName,
      userEmail,
      encryptedPassword,
      passwordSalt,
      role
    )

    await this.userRepository.save(user)
  }
}

export default CreateUserUseCase
