module.exports.schema = `

type Mutation {
  testMutation(testArg: String!): TestType!
}

type Query {
  testQuery(testArg: String!): TestType!
}

type TestType {
  test: String!
}

schema {
  query: Query
  mutation: Mutation
}`;
