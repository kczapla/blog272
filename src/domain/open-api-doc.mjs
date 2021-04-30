class OpenApiDoc {
  constructor(docsRepository) {
    this.docsRepository = docsRepository
  }

  getDocument() {
    return this.docsRepository.getDocument()
  }
}

export default OpenApiDoc
