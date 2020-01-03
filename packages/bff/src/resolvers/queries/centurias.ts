import { GraphQLFieldResolver } from "graphql";

import { Context } from "../../typings";
import { listCenturias } from "../../entitys/centuria";

export const centurias: GraphQLFieldResolver<undefined, Context> = async (
  _,
  {},
  context
) => {
  if (!context) return;
  return await listCenturias();
};
