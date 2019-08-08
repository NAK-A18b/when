const testQuery = async (args) => (
  new Promise(resolve => {
    resolve({
      test: 'TestString',
    });
  })
)

module.exports.resolvers = {
  Query: {
    testQuery: (root, args) => testQuery(args)
  }
}