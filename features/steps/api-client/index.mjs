import axios from "axios"

import { getLoginUrl, getPostsUrl, getUsersUrl } from "../config"

export const createPost = async (postRequestBody, authToken) => {
  const headers = { Authorization: `Bearer ${authToken}` }
  const createPostResponse = await axios.post(getPostsUrl(), postRequestBody, {
    headers: headers,
  })

  return { status: createPostResponse.status, data: createPostResponse.data }
}

export const readPost = async (postId) => {
  try {
    return await axios.get(getPostsUrl() + `/${postId}`)
  } catch (error) {
    return { status: error.response.status, data: error.response.data }
  }
}

export const deletePost = async (postId, authToken) => {
  const headers = { Authorization: `Bearer ${authToken}` }
  try {
    return await axios.delete(getPostsUrl() + `/${postId}`, {
      headers: headers,
    })
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

export const loginUser = async (loginUserDTO) => {
  try {
    return await axios.post(getLoginUrl(), loginUserDTO)
  } catch (error) {
    return { status: error.response.status, data: error.response.data }
  }
}

export const deleteUser = async (userId, authToken) => {
  const headers = { Authorization: `Bearer ${authToken}` }
  try {
    return await axios.delete(getUsersUrl() + `/${userId}`, {
      headers: headers,
    })
  } catch (error) {
    return { status: error.response.status, data: error.response.data }
  }
}
