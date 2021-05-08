import Koa from "koa"
import bodyParser from "koa-bodyparser"
import logger from "koa-logger"

class WebApp {
  constructor(configuration, router) {
    this.configuration = configuration

    this.app = new Koa()
    this.app.use(logger())
    this.app.use(bodyParser())
    this.app.use(router.getRoutes())
  }

  start() {
    this.server = this.app.listen(this.configuration.port)
  }

  stop() {
    this.server.close()
  }
}

export default WebApp
