const { HOST, PORT } = process.env

const getHost = () => {
  return HOST
}

const getPort = () => {
  return PORT
}

const getUrl = () => {
  return getHost() + ":" + getPort()
}

export default { getHost, getPort, getUrl }
