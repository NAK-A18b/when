const { ApolloServer, AuthenticationError } = require('apollo-server-lambda');
const { importSchema } = require('graphql-import');
const path = require('path');

const { getUser } = require('./entitys/user');

const { resolvers } = require('./resolvers');

const publicQueries = ['triggerAuth', 'loginUser'];

const server = new ApolloServer({
  typeDefs: importSchema(path.join(__dirname, '../schema.graphql')),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
  context: async ({ event, context }) => {
    const { body } = event;
    const isPublic = !!publicQueries.find(query => body.includes(query));

    const token = event.headers.Authorization || '';
    const user = await getUser(token);
    if (!user && !isPublic)
      throw new AuthenticationError('you must be logged in');

    return {
      currentUser: user,
      headers: event.headers,
      functionName: context.functionName,
      event,
      context
    };
  },
  playground: {
    endpoint: '/graphql'
  },
  tracing: true
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*'
  }
});
