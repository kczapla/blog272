class MongoDBUsersRepository {
  constructor(dbClient) {
    this.dbClient = dbClient
    this.usersCollection = dbClient.collection("users")
  }

  async exists(userEmail) {
    const doesExist = await this.usersCollection.findOne({ email: userEmail })
    return doesExist !== null
  }

  async save(user) {
    await this.usersCollection.insertOne({
      name: user.getName().getValue(),
      email: user.getEmail().getValue(),
      password: user.getEncryptedPassword().getValue(),
      salt: user.getSalt().getValue(),
    })
  }
}

export default MongoDBUsersRepository
