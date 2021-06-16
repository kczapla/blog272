class ReadDocsService {
  constructor(docsRepository) {
    this.docsRepository = docsRepository
  }

  async readApiDoc() {
    return await this.docsRepository.readApiDoc()
  }
}

export default ReadDocsService
