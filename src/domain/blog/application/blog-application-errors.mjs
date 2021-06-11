class InvalidPostData extends Error {
  constructor(message) {
    super(message)
  }
}

class PostNotFound extends Error {
  constructor(message) {
    super(message)
  }
}

export default { InvalidPostData, PostNotFound }
