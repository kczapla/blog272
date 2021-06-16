import ReadDocsService from "../read-docs-service"

describe("ReadDocsService readApiDoc", () => {
  it("returns open api JSON", async () => {
    const docsRepository = {
      readApiDoc: jest.fn(),
    }
    const openApi = { version: 3.0 }
    docsRepository.readApiDoc.mockReturnValue(openApi)
    const readDocsService = new ReadDocsService(docsRepository)

    await expect(readDocsService.readApiDoc()).resolves.toEqual(openApi)
  })
})
