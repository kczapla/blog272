export class UserUnauthorized extends Error {
  constructor() {
    const message = `Wrong email or password.`
    super(message)
  }
}

export class InvalidUserCredentails extends Error {
  constructor(message) {
    super(message)
  }
}
