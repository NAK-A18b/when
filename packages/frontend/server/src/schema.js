module.exports.schema = `

type Mutation {
  createSubscriber(username: String!, tel: String!, centuria: String!): Subscriber!
  deleteSubscriber(id: String!): Boolean!
  createCenturia(name: String!, semester: Int!): Centuria!
  createConnection(start: String!, end: String!): Connection!
  subscribeConnection(connection: String!, subscriber: String!): Subscriber!
  unsubscribeConnection(connection: String!, subscriber: String!): Subscriber!
}

type Query {
  subscribers: [Subscriber]
  centurias: [Centuria]
  connections: [Connection]
}

type Subscriber {
  id: ID!
  username: String!
  tel: String!
  centuria: Centuria!
  connections: [Connection]!
}

type Centuria {
  id: ID!
  name: String!
  semester: Int!
}

type Connection {
  id: ID!
  start: String!
  end: String!
}

schema {
  query: Query
  mutation: Mutation
}`;
