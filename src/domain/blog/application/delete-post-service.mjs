import { Id } from "../../core/domain"
import { CoreDomainError } from "../../core/domain"
import blogAppError from "./blog-application-errors"

class DeletePostService {
  constructor(postRepository) {
    this.postRepository = postRepository
  }

  async delete({ postId }) {
    let id
    try {
      id = Id.create(postId)
    } catch (e) {
      if (e instanceof CoreDomainError) {
        const errorMessage = `Given post id(${postId}) is invalid due to: ${e.message}.`
        throw new blogAppError.InvalidPostData(errorMessage)
      }
    }

    if (!(await this.postRepository.exists(id))) {
      throw new blogAppError.PostNotFound(
        `Post with given id(${postId}) was not found.`
      )
    }
    await this.postRepository.delete(id)
  }
}

export default DeletePostService
