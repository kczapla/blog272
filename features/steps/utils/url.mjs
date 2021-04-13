export const root = () => {
  return "http://127.0.0.1:3000/api/v0"
}

export const posts = () => {
  return root() + "/posts"
}

export const post = (postId) => {
  return posts() + `/${postId}`
}

export const login = () => {
  return root() + "/login"
}

export default { root, posts, post, login }
