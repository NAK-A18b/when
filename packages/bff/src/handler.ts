import { ApolloServer } from "apollo-server-lambda";
import { importSchema } from "graphql-import";
import path from "path";

import { getUser } from "./entitys/user";
import { resolvers } from "./resolvers";
import { Context } from "./typings";

const publicQueries = ["triggerAuth", "loginUser"];

const server = new ApolloServer({
  typeDefs: importSchema(path.join(__dirname, "../src/graphql/schema.graphql")),
  resolvers,
  formatError: error => {
    console.error(error);
    return error;
  },
  formatResponse: (response: string) => {
    console.info(response);
    return response;
  },
  context: async ({ event, context }): Promise<Context> => {
    const { body } = event;
    const isPublic = !!publicQueries.find(query => body.includes(query));

    const user = await getUser(event.headers.Authorization);
    if (!user && !isPublic) return context;

    return {
      currentUser: user,
      functionName: context.functionName,
      event,
      context
    };
  },
  playground: {
    endpoint: "/graphql"
  },
  tracing: true
});

export const graphqlHandler = server.createHandler({
  cors: {
    origin: "*"
  }
});
