class MongoUserAuthView {
  constructor(userCollection) {
    this.userCollection = userCollection
  }

  async findById(userId) {
    return await this.userCollection.findOne(
      { _id: userId.getValue() },
      { projection: { _id: 0, id: "$_id" } }
    )
  }
}

export default MongoUserAuthView
