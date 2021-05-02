class Posts {
  constructor(postsService) {
    this.postsService = postsService
  }

  async get(id) {
    const post = await this.postsService.get(id)

    if (Object.keys(post).length === 0) {
      throw `No post with id = ${id}`
    }

    return post
  }
}

export default Posts
