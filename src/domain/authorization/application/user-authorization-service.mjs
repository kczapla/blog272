import AuthorizationServiceTemplate from "./authorization-service-template"
import NotFoundError from "./not-found-error"
import { Id } from "../../core/domain"

class UserAuthorizationService extends AuthorizationServiceTemplate {
  constructor(userQuery, accountQuery, accessPoliciesRepository) {
    super(userQuery, accessPoliciesRepository)
    this.accountQuery = accountQuery
  }

  async getResourceById(accountId) {
    const account = await this.accountQuery.findById(Id.create(accountId))
    if (account === null) {
      throw new NotFoundError("Account", accountId)
    }
    return account
  }
}

export default UserAuthorizationService
