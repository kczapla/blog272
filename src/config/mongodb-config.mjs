const { MONGO_HOSTNAME, MONGO_PORT } = process.env

const getUri = () => {
  return `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}`
}

const getConnectionOptions = () => {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
}

export default { getUri, getConnectionOptions }
