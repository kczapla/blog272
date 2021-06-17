class UserUnauthorized extends Error {
  constructor() {
    const message = `Wrong email or password.`
    super(message)
  }
}

export default UserUnauthorized
