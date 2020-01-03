import { GraphQLFieldResolver } from "graphql";
import { Context } from "../../typings";
import { listUsers } from "../../entitys/user";

export const users: GraphQLFieldResolver<undefined, Context> = async (
  _,
  {},
  context
) => {
  if (!context) return;
  return (await listUsers()) || [];
};
