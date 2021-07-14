import { AccessPolicyCollection } from "../domain"

class SillyAccessPolicyRepository {
  constructor() {
    const userDeletePolicies = AccessPolicyCollection.create()
    userDeletePolicies.add((user, account) => {
      return user.id === account.id
    })
    const postDeletePolicies = AccessPolicyCollection.create()
    postDeletePolicies.add((user, post) => {
      return user.id === post.author.id
    })
    const postAddCommentPolicies = AccessPolicyCollection.create()
    postAddCommentPolicies.add((user) => {
      console.log("user.role ", user.role)
      return user.role === "writer"
    })

    this.actionPolicies = {
      "post:delete": postDeletePolicies,
      "post:comment": postAddCommentPolicies,
      "user:delete": userDeletePolicies,
    }
  }

  findByActionName(actionName) {
    return this.actionPolicies[actionName]
  }
}

export default SillyAccessPolicyRepository
