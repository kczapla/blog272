class RBACAuthorizationService {
  constructor(userId, userRepository) {
    this.userId = userId
    this.userRepository = userRepository

    this.roles = {
      writer: {
        "user:delete": ({ requesterId, userId }) => requesterId === userId,
        "post:create": () => true,
      },
    }
  }

  getUserId() {
    return this.userId
  }

  getUserRepository() {
    return this.userRepository
  }

  async can(action, params) {
    const user = await this.getUserRepository().findById(this.getUserId())

    if (user === null) {
      return false
    }

    const roleName = user.getRole().getValue()

    const role = this.roles[roleName]
    if (role === undefined) {
      return false
    }

    const roleAction = role[action]
    if (roleAction === undefined) {
      return false
    }

    return roleAction(params)
  }
}

export default RBACAuthorizationService
