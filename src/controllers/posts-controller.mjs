class PostsController {
  constructor(posts) {
    this.posts = posts
  }

  async read(ctx, next) {
    const id = ctx.request.params.id

    try {
      ctx.body = await this.posts.get(id)
      ctx.response.status = 200
    } catch (error) {
      ctx.body = error
      ctx.response.status = 404
    }
    await next()
  }
}

export default PostsController
