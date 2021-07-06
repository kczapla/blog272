import AuthorizationServiceTemplate from "./authorization-service-template"
import NotFoundError from "./not-found-error"
import { Id } from "../../core/domain"

class AuthorizationService extends AuthorizationServiceTemplate {
  constructor(userQuery, postQuery, accessPoliciesRepository) {
    super(userQuery, accessPoliciesRepository)
    this.postQuery = postQuery
  }

  async getResourceById(postId) {
    const post = await this.postQuery.findById(Id.create(postId))
    if (post === null) {
      throw new NotFoundError("Post", postId)
    }
    return post
  }
}

export default AuthorizationService
