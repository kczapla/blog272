import { AccessPolicyCollection } from "../domain"

class SillyAccessPolicyRepository {
  constructor() {
    const postDeletePolicies = AccessPolicyCollection.create()
    postDeletePolicies.add((user, post) => {
      return user.id === post.author.id
    })

    this.actionPolicies = {
      "post:delete": postDeletePolicies,
    }
  }

  findByActionName(actionName) {
    return this.actionPolicies[actionName]
  }
}

export default SillyAccessPolicyRepository
