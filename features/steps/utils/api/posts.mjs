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

export default { create, update }
