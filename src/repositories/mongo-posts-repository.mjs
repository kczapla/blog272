import mongodb from "mongodb"
const { ObjectId } = mongodb

class MongoPostsRepository {
  constructor(postsCollection) {
    this.postsCollection = postsCollection
  }

  async read(id) {
    let post
    try {
      post = await this.postsCollection.findOne({ _id: new ObjectId(id) })
    } catch (error) {
      console.log(error)
      return {}
    }

    post.publishing_date = ObjectId(post._id).getTimestamp()
    post.id = post._id
    delete post._id
    return post
  }

  async delete(id) {
    try {
      await this.postsCollection.deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async create(data) {
    try {
      const post = await this.postsCollection.insertOne(data)
      let insertedPost = post.ops[0]
      insertedPost.publishing_date = ObjectId(insertedPost._id).getTimestamp()
      insertedPost.id = insertedPost._id
      delete insertedPost._id
      return insertedPost
    } catch (error) {
      console.log(error)
      return {}
    }
  }
}

export default MongoPostsRepository
