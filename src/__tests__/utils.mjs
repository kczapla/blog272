export const makeObjectFieldMatcher = (obj) => {
  return (name) => {
    class Field {
      toBeInstanceOf(typeName) {
        if (!(name in obj)) {
          throw `${name} field is not in response body`
        }
        if (typeof obj[name] !== typeName) {
          throw `${obj} field type is not ${typeName}`
        }
      }
    }
    return new Field()
  }
}
