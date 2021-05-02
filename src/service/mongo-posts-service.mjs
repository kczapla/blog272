import mongodb from "mongodb"
const { ObjectId } = mongodb

class MongoPostsService {
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
}

export default MongoPostsService
