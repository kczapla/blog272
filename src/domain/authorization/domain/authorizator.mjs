import InvalidAuthorizationData from "./invalid-authorization-data"

class Authorizator {
  constructor() {
    this.accessPolicies = {}
  }

  addPolicy(accessPolicy) {
    const actionName = accessPolicy.getActionName()
    if (this.accessPolicies[actionName] === undefined) {
      this.accessPolicies[actionName] = []
    }
    this.accessPolicies[actionName].push(accessPolicy.getCondition())
  }

  doesAllow(user, actionName, resource) {
    const condtions = this.accessPolicies[actionName]
    if (condtions === undefined) {
      throw new InvalidAuthorizationData(`${actionName} is not supported`)
    }
    return condtions.some((condition) => condition(user, resource))
  }

  static create() {
    return new Authorizator()
  }
}

export default Authorizator
