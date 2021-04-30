import OpenApiDoc from "../open-api-doc"

describe("OpenApiDocs", () => {
  it("returns a document", () => {
    const docsService = {
      getDocument: () => "this is doc",
    }
    const docs = new OpenApiDoc(docsService)
    expect(docs.getDocument()).toMatch("this is doc")
  })
})
