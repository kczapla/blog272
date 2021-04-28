class DocsController {
  constructor(docs) {
    this.docs = docs
  }

  async raw(ctx, next) {
    ctx.body = this.docs.getDocument()
    await next()
  }
}

export default DocsController
