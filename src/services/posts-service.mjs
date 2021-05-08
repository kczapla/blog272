class PostsService {
    constructor(postsRepository) {
      this.postsRepository = postsRepository
    }
  
    async get(id) {
      const post = await this.postsRepository.get(id)
  
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
  }
  
  export default PostsService
  