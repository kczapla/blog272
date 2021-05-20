import { pbkdf2Sync, randomBytes } from "crypto"

class CryptoEncriptionService {
  constructor(saltLength, hashLength) {
    this.saltLength = saltLength
    this.hashLength = hashLength
    this.numberOfIterations = 100000
    this.shaAlgo = "sha512"
  }

  generateSalt() {
    return randomBytes(this.saltLength).toString("hex")
  }

  hash(plainText, salt) {
    return pbkdf2Sync(
      plainText,
      salt,
      this.numberOfIterations,
      this.hashLength,
      this.shaAlgo
    ).toString("hex")
  }
}

export default CryptoEncriptionService
