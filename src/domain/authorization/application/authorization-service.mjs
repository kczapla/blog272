import NotFoundError from "./not-found-error"
import { Id } from "../../core/domain"

class AuthorizationService {
  constructor(userQuery, postQuery, accessPolicyRepository) {
    this.userQuery = userQuery
    this.postQuery = postQuery
    this.accessPolicyRepository = accessPolicyRepository
  }

  async canUserDoActionOnPost(userId, actionName, postId) {
    const accessPolicies = this.accessPolicyRepository.findByActionName(
      actionName
    )
    if (accessPolicies.empty()) {
      throw Error(`Unknow action ${actionName}`)
    }

    const users = await this.userQuery.findById(Id.create(userId))
    if (users === null) {
      throw new NotFoundError("User", userId)
    }

    const posts = await this.postQuery.findById(Id.create(postId))
    if (posts === null) {
      throw new NotFoundError("Post", postId)
    }

    return accessPolicies.isAnyPolicyCompliant(users, posts)
  }
}

export default AuthorizationService
