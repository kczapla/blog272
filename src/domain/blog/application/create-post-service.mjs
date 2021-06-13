import {
  Id,
  Author,
  PublishingDate,
  Content,
  Tag,
  Tags,
  Post,
  AuthorName,
  Title,
} from "../domain"

import blogAppErrors from "./blog-application-errors"

class CreatePostService {
  constructor(postRepository) {
    this.postRepository = postRepository
  }

  getPostRepository() {
    return this.postRepository
  }

  async create(createPostDto) {
    let post
    try {
      const postId = Id.create(this.getPostRepository().nextIdentity())
      const title = Title.create(createPostDto.title)
      const authorId = Id.create(createPostDto.author.id)
      const authorName = AuthorName.create(createPostDto.author.name)
      const author = Author.create(authorId, authorName)
      const publishingDate = PublishingDate.create(Date.now())
      const content = Content.create(createPostDto.content)
      const rawTags = Array.from(createPostDto.tags, (tagName) =>
        Tag.create(tagName)
      )
      const tags = Tags.create(rawTags)

      post = Post.create(postId, title, author, publishingDate, tags, content)
    } catch (error) {
      throw new blogAppErrors.InvalidPostData(error.message)
    }

    await this.postRepository.save(post)
  }
}

export default CreatePostService
