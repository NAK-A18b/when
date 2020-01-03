import { Context } from "../../typings";
import { GraphQLFieldResolver } from "graphql";

import { listConnections } from "../../entitys/connection";

export const connections: GraphQLFieldResolver<undefined, Context> = async (
  _,
  {},
  context
) => {
  if (!context) return;
  return (await listConnections()) || [];
};
