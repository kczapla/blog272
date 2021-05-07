export const authorSchema = {
  id: "/PostAuthor",
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string", minLength: 3, maxLength: 32 },
  },
  required: ["id", "name"],
}

export const postRequestBodySchema = {
  id: "/PostRequestBody",
  type: "object",
  properties: {
    title: { type: "string", minLength: 3, maxLength: 100 },
    author: { $ref: "/PostAuthor" },
    categories: {
      type: "array",
      items: { type: "string", minLength: 1, maxLength: 20 },
    },
    tags: {
      type: "array",
      items: { type: "string", minLength: 1, maxLength: 20 },
    },
    content: { type: "string", minLength: 50, maxLength: 10000 },
  },
  required: ["title", "author", "content"],
}
