class MongoPostView {
  constructor(dbClient) {
    this.blogCollection = dbClient.collection("blog")
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
}

export default MongoPostView
