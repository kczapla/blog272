class DeletePost {
  constructor(postsService) {
    this.postsService = postsService
  }

  async delete(postId) {
    await this.postsService.delete(postId)
  }
}

export default DeletePost
