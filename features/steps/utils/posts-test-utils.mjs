export const makePostRequestBody = () => {
  return {
    author: {
      id: 1,
      name: "john",
    },
    title: "Test title",
    categories: ["cat1", "cat2"],
    tags: ["tag1", "tag2"],
    content: "Test content",
  }
}

export const makeCustomPostRequestBody = (customProperties) => {
  const postBody = makeCustomPostRequestBody()
  return Object.assign(postBody, customProperties)
}

export const makePostRequestBodyWithout = (propertyName) => {
  let postRequestBody = makePostRequestBody()
  delete postRequestBody[propertyName]

  return postRequestBody
}
