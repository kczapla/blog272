class Posts {
  constructor(postsService) {
    this.postsService = postsService
  }

  get(id) {
    const post = this.postsService.get(id)

    if (Object.keys(post).length === 0) {
      throw `No post with id = ${id}`
    }

    return post
  }
}

export default Posts
