class DeletePost {
  constructor(postsService) {
    this.postsService = postsService
  }

  async delete(postId) {
    console.log("post id " + postId)
    await this.postsService.delete(postId)
  }
}

export default DeletePost
