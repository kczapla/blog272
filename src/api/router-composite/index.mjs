import Router from "koa-router"

class RouterComposite {
  constructor(prefix) {
    this.prefix = prefix
    this.routersContainer = []
  }

  addRouter(router) {
    this.routersContainer.push(router)
  }

  getRoutes() {
    const root = new Router({
      prefix: this.prefix,
    })
    this.routersContainer.forEach((router) => root.use(router.getRoutes()))
    return root.routes()
  }
}

export default RouterComposite
