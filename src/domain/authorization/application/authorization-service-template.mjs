import NotFoundError from "./not-found-error"
import { Id } from "../../core/domain"

class AuthorizationServiceTemplate {
  constructor(userQuery, accessPolicyRepository) {
    this.userQuery = userQuery
    this.accessPolicyRepository = accessPolicyRepository
  }

  async isUserAuthorizedToDoActionOnResource(userId, actionName, resourceId) {
    const accessPolicies = await this.getAccessPoliciesForAction(actionName)
    const user = await this.getUserById(userId)
    const resource = await this.getResourceById(resourceId)
    return accessPolicies.isAnyPolicyCompliant(user, resource)
  }

  async getAccessPoliciesForAction(actionName) {
    const accessPolicies = this.accessPolicyRepository.findByActionName(
      actionName
    )
    if (accessPolicies.empty()) {
      throw Error(`Unknow action ${actionName}`)
    }

    return accessPolicies
  }

  async getUserById(userId) {
    const user = await this.userQuery.findById(Id.create(userId))
    if (user === null) {
      throw new NotFoundError("User", userId)
    }
    return user
  }

  async getResourceById() {
    throw new Error("Not implemented error")
  }
}

export default AuthorizationServiceTemplate
