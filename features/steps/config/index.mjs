const { BLOG272_HOST, BLOG272_PORT } = process.env

export const getAppUrl = () => {
  return `http://${BLOG272_HOST}:${BLOG272_PORT}`
}

export const getPostsUrl = () => {
  return getAppUrl() + "/api/v0/posts"
}
