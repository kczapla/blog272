import mongodb from "mongodb"
const { ObjectId } = mongodb

class MongoPostAuthView {
  constructor(postCollection) {
    this.postCollection = postCollection
  }

  async findById(postId) {
    const post = await this.postCollection.findOne(
      { _id: new ObjectId(postId.getValue()) },
      {
        projection: {
          _id: 0,
          id: { $toString: "$_id" },
          author: { id: { $toString: "$author.id" } },
        },
      }
    )

    return post
  }
}

export default MongoPostAuthView
