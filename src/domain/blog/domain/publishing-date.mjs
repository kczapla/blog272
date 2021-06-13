import { InvalidPostDataError } from "./index.mjs"

class PublishingDate {
  constructor(publishingDate) {
    this.publishingDate = publishingDate
  }

  getValue() {
    return this.publishingDate
  }

  equals(other) {
    return this.getValue() === other.getValue()
  }

  static create(publishingDate) {
    if (publishingDate === undefined) {
      throw new InvalidPostDataError("Publishing date is undefined.")
    }
    if (publishingDate === null) {
      throw new InvalidPostDataError("Publishing date is null.")
    }

    return new PublishingDate(publishingDate)
  }
}

export default PublishingDate
