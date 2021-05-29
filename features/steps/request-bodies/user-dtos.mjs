export const makeCreateUserDTO = (name, email, password) => {
  return {
    name: name,
    email: email,
    password: password,
  }
}

export const makeLoginUserDTO = (email, password) => {
  return {
    email: email,
    password: password,
  }
}
