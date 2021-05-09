import axios from "axios"

import { getPostsUrl } from "../config"

export const createPost = async (postRequestBody) => {
  const createPostResponse = await axios.post(getPostsUrl(), postRequestBody)

  return { status: createPostResponse.status, data: createPostResponse.data }
}

export const readPost = async (postId) => {
  try {
    return await axios.get(getPostsUrl() + `/${postId}`)
  } catch (error) {
    return { status: error.response.status, data: error.response.data }
  }
}

export const deletePost = async (postId) => {
  const deletePostResponse = await axios.delete(getPostsUrl() + `/${postId}`)
  return { status: deletePostResponse.status, data: deletePostResponse.data }
}
