import bson from "bson"
const { ObjectId } = bson

class MongoUserAuthView {
  constructor(userCollection) {
    this.userCollection = userCollection
  }

  async findById(userId) {
    return await this.userCollection.findOne(
      { _id: new ObjectId(userId.getValue()) },
      { projection: { _id: 0, id: { $toString: "$_id" } } }
    )
  }
}

export default MongoUserAuthView
