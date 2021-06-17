class UserAlreadyExists extends Error {
  constructor(email) {
    const message = `User with email '${email}' already exists`
    super(message)
  }
}

export default UserAlreadyExists
