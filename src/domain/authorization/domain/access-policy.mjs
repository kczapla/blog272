import InvalidAuthorizationData from "./invalid-authorization-data"

class AccessPolicy {
  constructor(actionName, condition) {
    this.actionName = actionName
    this.condition = condition
  }

  getActionName() {
    return this.actionName
  }

  getCondition() {
    return this.condition
  }

  static create(actionName, condition) {
    if (actionName === null || actionName === undefined) {
      throw new InvalidAuthorizationData(
        "AccessPolicy action name is null or undefined"
      )
    }

    if (!actionName) {
      throw new InvalidAuthorizationData("ActionPolicy action name is empty")
    }

    if (!(typeof condition === "function")) {
      throw new InvalidAuthorizationData(
        "AccessPolicy condtion is not a function"
      )
    }
    return new AccessPolicy(actionName, condition)
  }
}

export default AccessPolicy
