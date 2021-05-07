class CreatePost {
  constructor(postService) {
    this.postService = postService
  }

  async create(cratePostRequestBody) {
    return await this.postService.create(cratePostRequestBody)
  }
}

export default CreatePost
