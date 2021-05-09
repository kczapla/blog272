const errorResponseSchema = {
  schemaId: "auto",
  type: "object",
  properties: {
    code: {
      type: "integer",
    },
    message: {
      type: "string",
    },
  },
  required: ["code", "message"],
}

export default errorResponseSchema
