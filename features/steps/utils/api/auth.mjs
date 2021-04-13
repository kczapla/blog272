import axios from "axios"

import url from "../url"

export const login = async (email, password) => {
  return await await axios
    .post(url.root() + "/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      return response.body.token
    })
}
