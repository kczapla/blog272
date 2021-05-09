class PostsService {
  constructor(postsRepository) {
    this.postsRepository = postsRepository
  }

  async read(id) {
    return await this.postsRepository.read(id)
  }

  async create(createPostRequestBody) {
    return await this.postsRepository.create(createPostRequestBody)
  }

  async delete(id) {
    await this.postsRepository.delete(id)
  }
}

export default PostsService
