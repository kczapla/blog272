import { Id, Title } from "../domain"
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

  async read({ postId }) {
    if (postId === null || postId === undefined) {
      throw new blogAppErrors.InvalidPostData(
        "Find post by id dto is null or undefined."
      )
    }

    const id = Id.create(postId)
    const posts = await this.postView.findById(id)

    if (!Array.isArray(posts)) {
      throw new blogAppErrors.InvalidPostData("PostView returned invalid data.")
    }
    if (posts.length === 0) {
      throw new blogAppErrors.PostNotFound(
        `Post with id "${id.getValue()}" not found.`
      )
    }

    return posts[0]
  }
}

export default ReadPostService
