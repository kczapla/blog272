import Router from "koa-router"
import { makePostRouter, PostController } from "./posts"
import { makeDocsRouter, makeDocsUiRouter } from "./docs"

function makeVersionRouter() {
  const router = new Router({
    prefix: "/v0",
  })

  router.use(makeDocsRouter().routes())
  router.use(makeDocsUiRouter().routes())
  router.use(makePostRouter(new PostController()).routes())

  return router
}

export default makeVersionRouter
