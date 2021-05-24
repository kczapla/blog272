const { BLOG272_HOST, BLOG272_PORT } = process.env

export const getAppUrl = () => {
  return `http://${BLOG272_HOST}:${BLOG272_PORT}`
}

export const getPostsUrl = () => {
  return getAppUrl() + "/api/v0/posts"
}

export const getUsersUrl = () => {
  return getAppUrl() + "/api/v0/users"
}

export const getLoginUrl = () => {
  return getAppUrl() + "/api/v0/login"
}
