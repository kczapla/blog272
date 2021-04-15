import Author from "./author"

export const makeBob = () => {
  return new Author("bob", "bob@myblog.com", "bobpasswd")
}

export const makeMark = () => {
  return new Author("mark", "mark@myblog.com", "markpasswd")
}
