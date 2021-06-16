import fs from "fs"
import yaml from "js-yaml"

class YamlDocsRepository {
  constructor(filePath) {
    this.filePath = filePath
  }

  async readApiDoc() {
    return yaml.load(fs.readFileSync(this.filePath.toString()))
  }
}

export default YamlDocsRepository
