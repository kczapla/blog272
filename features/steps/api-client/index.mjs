import axios from "axios"

import { getPostsUrl } from "../config"

export const createPost = async (postRequestBody) => {
  const createPostResponse = await axios.post(getPostsUrl(), postRequestBody)

  return { status: createPostResponse.status, data: createPostResponse.data }
}
