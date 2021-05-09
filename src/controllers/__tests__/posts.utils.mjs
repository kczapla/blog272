export const createPostRequestBody = () => {
  return {
    title: "test title",
    author: {
      id: 1,
      name: "bob",
    },
    categories: ["cat1", "cat2"],
    tags: ["tag1", "tag2"],
    content: "test content test content test content test content test content",
  }
}

export const createResponseBody = () => {
  let responseBody = createPostRequestBody()
  responseBody["publish_date"] = "1994-11-05T08:15:30-05:00"
  responseBody["id"] = 1

  return responseBody
}

export const createContext = () => {
  return {
    request: {
      params: {
        id: "1",
      },
      body: createPostRequestBody(),
    },
    response: {
      body: {},
      status: 0,
    },
  }
}
