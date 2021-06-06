class RBACAuthorizationService {
  constructor(userId, userRepository) {
    this.userId = userId
    this.userRepository = userRepository
  }

  getUserId() {
    return this.userId
  }

  getUserRepository() {
    return this.userRepository
  }

  async can(action, params) {
    const user = await this.getUserRepository().findUserById(this.getUserId())
    const role = user.getRole()

    if (params === undefined || params === null) {
      return role.can(action)
    }

    return role.can(action)(params)
  }
}

export default RBACAuthorizationService
