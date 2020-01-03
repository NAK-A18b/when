import { GraphQLFieldResolver } from "graphql";

import { findUserByTel } from "../../entitys/user";
import { Context } from "../../typings";

type MutationPayload = {
  tel: string;
  token: number;
};

export const loginUser: GraphQLFieldResolver<
  undefined,
  Context,
  MutationPayload
> = async (_, { tel, token }) => {
  const user = await findUserByTel(tel);
  if (!user) return;

  return user.token === token ? user : undefined;
};
