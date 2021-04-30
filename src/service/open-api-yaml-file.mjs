import fs from "fs"
import yaml from "js-yaml"

class OpenApiYamlFile {
  constructor(openApiDocPath) {
    this.openApiDocPath = openApiDocPath
  }

  getDocument() {
    let doc
    try {
      doc = yaml.load(fs.readFileSync(this.openApiDocPath.toString()))
    } catch (e) {
      console.log(e)
    }

    return doc
  }
}

export default OpenApiYamlFile
