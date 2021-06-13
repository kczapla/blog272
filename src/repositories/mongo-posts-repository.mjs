import mongodb from "mongodb"
const { ObjectId } = mongodb

class MongoPostsRepository {
  constructor(postsCollection) {
    this.postsCollection = postsCollection
  }

  async read(id) {
    let post
    console.log("posts repo id " + id)
    try {
      post = await this.postsCollection.findOne({ _id: new ObjectId(id) })
      console.log("posts repo " + JSON.stringify(post))
    } catch (error) {
      console.log(error)
      return {}
    }

    if (post === null) {
      return {}
    }

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
