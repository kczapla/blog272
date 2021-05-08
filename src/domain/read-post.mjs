import { Post } from "./index.mjs"

class ReadPost {
  constructor(postsService) {
    this.postsService = postsService
  }

  async read(id) {
    const p = await this.postsService.read(id)
    return new Post(p)
  }
}

export default ReadPost
