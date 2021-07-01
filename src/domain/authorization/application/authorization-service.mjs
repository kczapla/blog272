import { Id } from "../../core/domain"

class AuthorizationService {
  constructor(userQuery, postQuery, accessPolicyRepository) {
    this.userQuery = userQuery
    this.postQuery = postQuery
    this.accessPolicyRepository = accessPolicyRepository
  }

  canUserDoActionOnPost(userId, actionName, postId) {
    const accessPolicies = this.accessPolicyRepository.findByActionName(
      actionName
    )
    if (accessPolicies.empty()) {
      throw Error(`Unknow action ${actionName}`)
    }

    const users = this.userQuery.findById(Id.create(userId))
    const posts = this.postQuery.findById(Id.create(postId))

    return accessPolicies.isAnyPolicyCompliant(users, posts)
  }
}

export default AuthorizationService
