import Koa from "koa"
import makeApiRouter from "./api"

const app = new Koa()

app.use(makeApiRouter().routes())
app.listen(3000)
