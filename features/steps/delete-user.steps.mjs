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
  test("Unauthenticated user can't delete an account", ({
    given,
    when,
    then,
  }) => {
    let bobsAccountId
    given("Bob is not logged in", async () => {
      const email = "unathenticatedbob@bob.com"
      const password = "12345678ap67("
      const createBobDto = makeCreateUserDTO("bob", email, password)
      const createResponse = await createUser(createBobDto)
      expect(createResponse.status).toEqual(201)

      const loginResponse = await loginUser(makeLoginUserDTO(email, password))
      expect(loginResponse.status).toEqual(201)

      bobsAccountId = getUserIdFromJWTToken(loginResponse.data.token)
    })

    let deleteResponse
    when("he tries to delete his account", async () => {
      deleteResponse = await deleteUser(bobsAccountId, "xxxx.yyyy.zzzz")
    })

    then("the server rejescts his request and returns an error", () => {
      expect(deleteResponse.status).toEqual(401)
    })
  })
  test("Only owner can delete his account", ({ given, when, then }) => {
    let bobsToken
    let marksAccountId
    given("Bob and Mark have an accounts on the blog", async () => {
      const bobsEmail = "unauthorizedbob@bob.com"
      const bobsPassword = "1234567890Qw"
      const createBobDto = makeCreateUserDTO("bob", bobsEmail, bobsPassword)
      const createBobResponse = await createUser(createBobDto)
      expect(createBobResponse.status).toEqual(201)

      const bobsLoginResponse = await loginUser(
        makeLoginUserDTO(bobsEmail, bobsPassword)
      )
      expect(bobsLoginResponse.status).toEqual(201)
      bobsToken = bobsLoginResponse.data.token

      const marksEmail = "unauthorizedmark@bob.com"
      const marksPassword = "1234567890Qw"
      const createMarkDto = makeCreateUserDTO("mark", marksEmail, marksPassword)
      const createMarkResponse = await createUser(createMarkDto)
      expect(createMarkResponse.status).toEqual(201)

      const marksLoginResponse = await loginUser(
        makeLoginUserDTO(marksEmail, marksPassword)
      )
      expect(marksLoginResponse.status).toEqual(201)
      marksAccountId = getUserIdFromJWTToken(marksLoginResponse.data.token)
    })

    let deleteResponse
    when("Bob tries to delete Mark's account", async () => {
      deleteResponse = await deleteUser(marksAccountId, bobsToken)
    })

    then("the server rejects his request and returns an error", () => {
      console.log(deleteResponse)
      expect(deleteResponse.status).toEqual(403)
    })
  })
})
