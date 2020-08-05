import { ApolloServer, AuthenticationError } from "apollo-server-lambda";
import { importSchema } from "graphql-import";
import path from "path";

import { findUserByToken } from "./entitys/user";
import { resolvers } from "./resolvers";
import { Context } from "./typings";

const publicQueries = ["TriggerAuth", "LoginUser"];

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
    const body = JSON.parse(event.body);
    const isPublic = publicQueries.includes(body.operationName);

    const user = await findUserByToken(event.headers.Authorization || "");
    if (!user && !isPublic)
      throw new AuthenticationError("you must be logged in");

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
