const createdBy = (user) => {
  return {
    author: {
      id: user.id,
      name: user.name,
    },
    title: "Test title",
    categories: ["cat1", "cat2"],
    tags: ["tag1", "tag2"],
    content: "Test content",
  }
}

export default { createdBy }
