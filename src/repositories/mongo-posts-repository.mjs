import mongodb from "mongodb"
const { ObjectId } = mongodb

class MongoPostsRepository {
  constructor(postsCollection) {
    this.postsCollection = postsCollection
  }

  async get(id) {
    let post
    try {
      post = await this.postsCollection.findOne({ _id: new ObjectId(id) })
    } catch (error) {
      post = {}
      console.log(error)
    }
    return post
  }

  async create(data) {
    try {
      const post = await this.postsCollection.insertOne(data)
      let insertedPost = post.ops[0]
      insertedPost.published_date = ObjectId(insertedPost._id).getTimestamp()
      return insertedPost
    } catch (error) {
      console.log(error)
      return {}
    }
  }
}

export default MongoPostsRepository
