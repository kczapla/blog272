import Router from "koa-router"
import { default as makeVersion0Router } from "./v0"

function makeApiRouter() {
  const router = new Router({
    prefix: "/api",
  })

  router.use(makeVersion0Router().routes())

  return router
}

export default makeApiRouter
