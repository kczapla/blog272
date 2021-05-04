const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env

const getMongoDbName = () => {
  return MONGO_DB
}

const getUri = () => {
  return `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}`
}

const getConnectionOptions = () => {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
}

export default { getUri, getMongoDbName, getConnectionOptions }
