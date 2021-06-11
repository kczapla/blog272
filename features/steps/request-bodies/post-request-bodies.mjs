export const makeDefaultCreatePostRequestBody = () => {
  return {
    title: "test title",
    author: {
      id: "axcde123asdf",
      name: "Bob",
    },
    categories: [],
    tags: [],
    content: "this is test content aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  }
}
