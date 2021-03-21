import Koa from "koa"
import makeApiRouter from "./api"
import { WebApp } from "./web/app"

const app = new Koa()

app.use(makeApiRouter().routes())

const webApp = new WebApp(app, 3000)
webApp.start()
