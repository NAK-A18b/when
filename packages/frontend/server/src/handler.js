const { ApolloServer, AuthenticationError } = require('apollo-server-lambda');
const { importSchema } = require('graphql-import');

const { getUser } = require('./entitys/user');

const { resolvers } = require('./resolvers');

const publicQueries = [ 'triggerAuth', 'loginUser' ];

const server = new ApolloServer({
  typeDefs: importSchema('./server/schema.graphql'),
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

    const token = event.headers.authorization || '';
    const user = await getUser(token);
    if (!user && !isPublic) throw new AuthenticationError('you must be logged in'); 

    return {
      currentUser: user,
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    }
  },
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