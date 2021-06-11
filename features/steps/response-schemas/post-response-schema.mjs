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
    publishingDate: {
      type: "string",
      format: "date-time",
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
  required: ["id", "title", "publishingDate", "tags", "content"],
}

export default postResponseSchema
