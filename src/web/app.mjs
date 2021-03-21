export class WebApp {
  app
  server
  port
  constructor(app, port) {
    if (isNaN(port)) {
      throw "Port is not a number."
    }

    this.app = app
    this.port = port
  }

  start() {
    this.server = this.app.listen(this.port)
  }

  stop() {
    this.server.close()
  }
}
