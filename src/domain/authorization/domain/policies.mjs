import AccessPolicy from "./access-policy.mjs"

export const makePolicies = (authorizator) => {
  authorizator.addPolicy(
    AccessPolicy.create("post:delete", (user, post) => {
      user.id === post.author.id
    })
  )
}
