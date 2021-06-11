import { Title } from "../domain"
import blogAppErrors from "./blog-application-errors"

class ReadPostService {
  constructor(postView) {
    this.postView = postView
  }

  async findByTitle(findByTitleDto) {
    const title = Title.create(findByTitleDto)
    const posts = await this.postView.findByTitle(title)
    if (!Array.isArray(posts)) {
      throw new blogAppErrors.InvalidPostData("PostView returned invalid data.")
    }
    if (posts.length === 0) {
      throw new blogAppErrors.PostNotFound(
        `Post with title "${title.getValue()}" not found.`
      )
    }

    return posts[0]
  }
}

export default ReadPostService
