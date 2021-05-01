class PostsController {
  constructor(posts) {
    this.posts = posts
  }

  async read(ctx, next) {
    const id = ctx.request.query.id

    if (!Number.isInteger(id)) {
      ctx.body = {
        code: 1,
        message: "Given post id is not an integer.",
      }
      ctx.response.status = 400
      return
    }

    try {
      ctx.body = this.posts.get(id)
      ctx.response.status = 200
    } catch (error) {
      ctx.body = error
      ctx.response.status = 404
    }
    await next()
  }
}

export default PostsController
