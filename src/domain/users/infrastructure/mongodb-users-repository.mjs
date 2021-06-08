import bson from "bson"
const { ObjectId } = bson

import Id from "../domain/id"
import Name from "../domain/name"
import Salt from "../domain/salt"
import User from "../domain/user"
import Email from "../domain/email"
import EncryptedPassword from "../domain/encrypted-password"
import Role from "../domain/role.mjs"

class MongoDBUsersRepository {
  constructor(dbClient) {
    this.dbClient = dbClient
    this.usersCollection = dbClient.collection("users")
  }

  nextIdentity() {
    return ObjectId().toString()
  }

  async findById(userId) {
    const rawUser = await this.usersCollection.findOne({ _id: userId })

    if (rawUser === null) {
      return rawUser
    }

    const id = Id.create(rawUser._id)
    const name = Name.create(rawUser.name)
    const salt = Salt.create(rawUser.salt)
    const email = Email.create(rawUser.email)
    const encryptedPassword = EncryptedPassword.create(rawUser.password)
    const role = Role.create(rawUser.role)

    return User.create(id, name, email, encryptedPassword, salt, role)
  }

  async findByEmail(userEmail) {
    const rawUser = await this.usersCollection.findOne({ email: userEmail })

    if (rawUser == null) {
      return rawUser
    }

    const id = Id.create(rawUser._id)
    const name = Name.create(rawUser.name)
    const salt = Salt.create(rawUser.salt)
    const email = Email.create(rawUser.email)
    const encryptedPassword = EncryptedPassword.create(rawUser.password)
    const role = Role.create(rawUser.role)

    return User.create(id, name, email, encryptedPassword, salt, role)
  }

  async exists(userEmail) {
    const doesExist = await this.usersCollection.findOne({ email: userEmail })
    return doesExist !== null
  }

  async save(user) {
    await this.usersCollection.insertOne({
      _id: user.getId().getValue(),
      name: user.getName().getValue(),
      email: user.getEmail().getValue(),
      password: user.getEncryptedPassword().getValue(),
      salt: user.getSalt().getValue(),
      role: user.getRole().getValue(),
    })
  }

  async deleteById(userId) {
    await this.usersCollection.deleteOne({
      _id: userId,
    })
  }
}

export default MongoDBUsersRepository
