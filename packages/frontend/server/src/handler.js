const { ApolloServer } = require('apollo-server-lambda');
const { importSchema } = require('graphql-import');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({
  typeDefs: importSchema('schema.graphql'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  playground: {
    endpoint: '/graphql',
  },
  tracing: true,
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
  },
});