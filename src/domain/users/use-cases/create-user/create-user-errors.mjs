export class UserAlreadyExists extends Error {
  constructor(email) {
    const message = `User with email '${email}' already exists`
    super(message)
  }
}

export class InvalidUserData extends Error {
  constructor(message) {
    super(message)
  }
}
