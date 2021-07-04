import mongodb from "mongodb"
const { ObjectId } = mongodb

class MongoPostAuthView {
  constructor(postCollection) {
    this.postCollection = postCollection
  }

  async findById(postId) {
    const post = await this.postCollection.findOne(
      { _id: new ObjectId(postId.getValue()) },
      { projection: { _id: 0, id: "$_id", author: { id: 1 } } }
    )
    return post
  }
}

export default MongoPostAuthView
