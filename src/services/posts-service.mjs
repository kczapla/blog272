class PostsService {
  constructor(postsRepository) {
    this.postsRepository = postsRepository
  }

  async read(id) {
    let post = await this.postsRepository.read(id)
    post.id = post._id

    if (Object.keys(post).length === 0) {
      throw `No post with id = ${id}`
    }

    return post
  }

  async create(createPostRequestBody) {
    let post = await this.postsRepository.create(createPostRequestBody)
    post.id = post._id
    delete post._id

    return post
  }

  async delete(id) {
    await this.postsRepository.delete(id)
  }
}

export default PostsService
