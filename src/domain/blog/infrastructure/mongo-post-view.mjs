import mongodb from "mongodb"
const { ObjectId } = mongodb

class MongoPostView {
  constructor(dbClient) {
    this.blogCollection = dbClient.collection("blog")
    this.postProjection = {
      _id: 0,
      id: "$_id",
      title: 1,
      publishingDate: {
        $toDate: "$publishingDate",
      },
      tags: 1,
      content: 1,
    }
  }

  async findByTitle(title) {
    const projection = {
      _id: 0,
      id: "$_id",
      title: 1,
      publishingDate: {
        $toDate: "$publishingDate",
      },
      tags: 1,
      content: 1,
    }
    const result = await this.blogCollection
      .find({ title: title.getValue() })
      .project(projection)
      .toArray()
    return result
  }

  async findById(id) {
    return await this.blogCollection
      .find({ _id: new ObjectId(id.getValue()) })
      .project(this.postProjection)
      .toArray()
  }
}

export default MongoPostView
