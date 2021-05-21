import { defineFeature, loadFeature } from "jest-cucumber"
import { createUser } from "./api-client"

const feature = loadFeature("./features/create-user.feature")

defineFeature(feature, (test) => {
  test("Create user", ({ given, when, then }) => {
    let bob
    given("Bob doesn't have an account on the blog", () => {
      bob = {
        name: "bob",
        email: "createuserbob@bob.com",
        password: "bobbobbob",
      }
    })

    let createUserResponse
    when("he sends filled form to the server", async () => {
      createUserResponse = await createUser(bob)
    })

    then("server should process the request successfully", () => {
      expect(createUserResponse.status).toEqual(201)
    })
  })
  test("User already exists", ({ given, but, when, then }) => {
    const userDto = {
      name: "bob",
      email: "useralreadyexistsbob@bob.com",
      password: "bobbobbob",
    }
    given("Bob created an account in the past", async () => {
      const res = await createUser(userDto)
      expect(res.status).toEqual(201)
    })

    but("he forgot about it", () => {})

    let createUserResponse
    when("he sends form again", async () => {
      createUserResponse = await createUser(userDto)
    })

    then("the server should reject his request", () => {
      expect(createUserResponse.status).toEqual(409)
    })
  })
  test("Invalid form", ({ given, when, then }) => {
    let userDto
    given("Bob wants to create an account", () => {
      userDto = {
        name: "bob",
        email: "invalidformbob@bob.com",
        password: "1",
      }
    })

    let createUserResponse
    when("he sends form with invalid data", async () => {
      createUserResponse = await createUser(createUserResponse)
    })

    then("the server should his request", () => {
      expect(createUserResponse.status).toEqual(400)
    })
  })
})
