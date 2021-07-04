class NotFoundError extends Error {
  constructor(resourceName, resourceId) {
    const msg = `${resourceName}(id=${resourceId}) was not found`
    super(msg)
  }
}

export default NotFoundError
