import axios from "axios"

import { getPostsUrl, getUsersUrl } from "../config"

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
  try {
    return await axios.delete(getPostsUrl() + `/${postId}`)
  } catch (error) {
    return { status: error.response.status, data: error.response.data }
  }
}

export const createUser = async (createUserDTO) => {
  try {
    return await axios.post(getUsersUrl(), createUserDTO)
  } catch (error) {
    return { status: error.response.status, data: error.response.data }
  }
}
