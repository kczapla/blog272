import bson from "bson"
const { ObjectId } = bson

class MongoPostRepository {
  constructor(dbClient) {
    this.dbClient = dbClient
    this.blogCollection = dbClient.collection("blog")
  }

  nextIdentity() {
    return ObjectId().toString()
  }

  async exists(postId) {
    const post = await this.blogCollection.findOne({
      _id: new ObjectId(postId.getValue()),
    })
    return post !== null
  }

  async delete(postId) {
    await this.blogCollection.deleteOne({
      _id: new ObjectId(postId.getValue()),
    })
  }

  async save(post) {
    const tags = Array.from(post.getTags(), (tag) => tag.getValue())
    await this.blogCollection.insertOne({
      _id: new ObjectId(post.getId().getValue()),
      title: post.getTitle().getValue(),
      author: {
        id: post.getAuthor().getId().getValue(),
        name: post.getAuthor().getAuthorName().getValue(),
      },
      publishingDate: post.getPublishingDate().getValue(),
      tags: tags,
      content: post.getContent().getValue(),
    })
  }
}

export default MongoPostRepository
