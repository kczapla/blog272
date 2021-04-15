import axios from "axios"
import url from "../url"

const create = async (postBody, jwtToken) => {
  return await axios.post(url.posts(), postBody, {
    auth: `Bearer ${jwtToken}`,
  })
}

const update = async (putBody, postId, jwtToken) => {
  return await axios.put(url.post(postId), putBody, {
    auth: `Bearer ${jwtToken}`,
  })
}

const index = async (query) => {
  let indexUrl = url.posts()
  if (query !== "") {
    indexUrl += "?" + query
  }

  return await axios.get(indexUrl)
}

export default { create, update, index }
