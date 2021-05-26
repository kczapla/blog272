const { JWT_SECRET } = process.env

const getJwtSecret = () => JWT_SECRET

export default { getJwtSecret }
