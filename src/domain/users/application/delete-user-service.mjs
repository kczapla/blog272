import { Id, UserError } from "../domain"
import { InvalidUserId } from "./errors"

class DeleteUserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(deleteUserDto) {
    const { userId } = deleteUserDto

    let id
    try {
      id = Id.create(userId)
    } catch (e) {
      if (e instanceof UserError) {
        throw new InvalidUserId(e.message)
      }
      throw e
    }
    this.userRepository.deleteById(id.getValue())
  }
}

export default DeleteUserService
