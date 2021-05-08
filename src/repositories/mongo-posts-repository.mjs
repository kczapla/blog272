import mongodb from "mongodb"
const { ObjectId } = mongodb

class MongoPostsRepository {
  constructor(postsCollection) {
    this.postsCollection = postsCollection
  }

  async read(id) {
    try {
      let post = await this.postsCollection.findOne({ _id: new ObjectId(id) })
      post.publish_date = ObjectId(post._id).getTimestamp()
      return post
    } catch (error) {
      console.log(error)
      return {}
    }
  }

  async create(data) {
    try {
      const post = await this.postsCollection.insertOne(data)
      let insertedPost = post.ops[0]
      insertedPost.publishing_date = ObjectId(insertedPost._id).getTimestamp()
      return insertedPost
    } catch (error) {
      console.log(error)
      return {}
    }
  }
}

export default MongoPostsRepository
