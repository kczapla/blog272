export const makeObjectFieldMatcher = (obj) => {
  return (name) => {
    class Field {
      toBeInstanceOf(typeName) {
        if (!(name in obj)) {
          throw `${name} field is not in response body`
        }
        if (typeof obj[name] !== typeName) {
          throw `${obj} field type is not ${typeName}`
        }
      }
    }
    return new Field()
  }
}

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
