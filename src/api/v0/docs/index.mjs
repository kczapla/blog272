import Router from "koa-router"
import koa2SwaggerUi from "koa2-swagger-ui"
import yaml from "js-yaml"
import path from "path"
import fs from 'fs'

const { koaSwagger } = koa2SwaggerUi

export function makeDocsRouter() {
  const router = new Router()

  router.get("/docs", async (ctx, next) => {
    const openapiDoc = path.join(path.dirname(""), "/docs/api/v0/openapi.yaml")
    try {
        ctx.body = yaml.load(fs.readFileSync(openapiDoc.toString()))
    } catch (e) {
        console.log(e)
    }
    await next()
  })

  return router
}

export function makeDocsUiRouter() {
  const router = new Router()
  router.get(
    "/docs-ui",
    koaSwagger({
      routePrefix: false,
      swaggerOptions: { url: "http://localhost:3000/api/v0/docs" },
    })
  )
  return router
}
