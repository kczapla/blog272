import Router from "koa-router"

function makeRouter(controller) {
  const router = new Router({
    prefix: "/posts",
  })

  router.get("/", controller.index)
  router.get("/:id", controller.show)

  return router
}

export default makeRouter
