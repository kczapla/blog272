class PostController {
  async index(ctx, next) {
    ctx.body = [
      { id: 1, name: "krzysztof", surname: "czapla" },
      { id: 2, name: "krzysztof", surname: "czapla" },
    ]
    await next()
  }
  async show(ctx, next) {
    ctx.body = { id: 1, name: "krzysztof", surname: "czapla" }
    await next()
  }
}

export default PostController
