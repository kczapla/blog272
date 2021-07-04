class AccessPolicyCollection {
  constructor() {
    this.accessPolicyContainer = []
  }

  isAnyPolicyCompliant(user, resource) {
    return this.accessPolicyContainer.some((f) => f(user, resource))
  }

  empty() {
    return this.accessPolicyContainer.length === 0
  }

  add(accessPolicy) {
    this.accessPolicyContainer.push(accessPolicy)
  }

  static create() {
    return new AccessPolicyCollection()
  }
}

export default AccessPolicyCollection
