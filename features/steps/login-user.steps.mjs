import { defineFeature, loadFeature } from "jest-cucumber"
import { createUser, loginUser } from "./api-client"

const feature = loadFeature("./features/login-user.feature")

defineFeature(feature, (test) => {
  test("Login user", ({ given, when, then }) => {
    const email = "bobloginuser@bob.com"
    const password = "12345678"
    given("Bob has an account on the blog", async () => {
      const createUserResponse = await createUser({
        name: "bobLoginUser",
        email: email,
        password: password,
      })
      expect(createUserResponse.status).toEqual(201)
    })

    let loginResponse
    when("he logs in using his crdentials", async () => {
      loginResponse = await loginUser({ email: email, password: password })
    })

    then("server returns authorizes him successfully", () => {
      expect(loginResponse.status).toEqual(201)
      expect(loginResponse.data).toHaveProperty("token")
      expect(loginResponse.data.token).toMatch(/.+/)
    })
  })
})
