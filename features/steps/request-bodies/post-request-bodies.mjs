export const makeDefaultCreatePostRequestBody = () => {
  return {
    title: "test title",
    author: {
      id: 1,
      name: "Bob",
    },
    categories: [],
    tags: [],
    content: "this is test content aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  }
}
