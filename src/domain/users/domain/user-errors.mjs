export class InvalidUserData extends Error {
  constructor(message) {
    super(message)
  }
}

export class GenericUserError extends Error {
  constructor(message) {
    super(message)
  }
}
