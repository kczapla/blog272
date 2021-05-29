import { defineFeature, loadFeature } from "jest-cucumber"
import { deleteUser, loginUser, createUser } from "./api-client"
import { getUserIdFromJWTToken } from "./utilities"
import { makeLoginUserDTO, makeCreateUserDTO } from "./request-bodies"

const feature = loadFeature("./features/delete-user.feature")

defineFeature(feature, (test) => {
  test("Authenticated user deletes his account", ({ given, when, then }) => {
    const email = "bobdeleteuser@bob.com"
    const password = "12345678"

    let token
    given("Bob is logged in", async () => {
      const createUserDTO = makeCreateUserDTO("bob", email, password)
      const response = await createUser(createUserDTO)
      expect(response.status).toEqual(201)

      const loginUserDTO = makeLoginUserDTO(email, password)
      const loginResponse = await loginUser(loginUserDTO)
      expect(loginResponse.status).toEqual(201)

      token = loginResponse.data.token
    })
    when("he deletes his account", async () => {
      const userId = getUserIdFromJWTToken(token)
      const deleteResponse = await deleteUser(userId, token)
      expect(deleteResponse.status).toEqual(200)
    })
    then("he can't login using his credentials", async () => {
      const loginUserDTO = makeLoginUserDTO(email, password)
      const loginResponse = await loginUser(loginUserDTO)
      expect(loginResponse.status).toEqual(400)
    })
  })
})
