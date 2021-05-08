const postResponseSchema = {
  schemaId: "auto",
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    publishing_date: {
      type: "string",
      format: "date-time",
    },
    categories: {
      type: "array",
      items: {
        type: "string",
      },
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
    },
    content: {
      type: "string",
    },
  },
  required: ["id", "title", "publishing_date", "categories", "tags", "content"],
}

export default postResponseSchema
