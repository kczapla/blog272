export const createErrorResponseBody = (code, message) => {
  return {
    code: code,
    message: message,
  }
}
