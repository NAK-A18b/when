import { Context } from "../../typings";
import { GraphQLFieldResolver } from "graphql";

export const currentUser: GraphQLFieldResolver<undefined, Context> = async (
  _,
  {},
  context
) => {
  if (!context) return;
  return context.currentUser;
};
