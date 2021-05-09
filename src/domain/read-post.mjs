import { Post } from "./index.mjs"

class ReadPost {
  constructor(postsService) {
    this.postsService = postsService
  }

  async read(id) {
    const post = await this.postsService.read(id)
    if (Object.keys(post).length === 0) {
      return null
    }
    return new Post(post)
  }
}

export default ReadPost
