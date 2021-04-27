import Koa from "koa"

export class WebApp {
  constructor(configuration, router) {
    this.configuration = configuration

    this.app = new Koa()
    this.app.use(router.getRoutes())
  }

  start() {
    this.server = this.app.listen(this.configuration.port)
  }

  stop() {
    this.server.close()
  }
}
