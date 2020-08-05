import { GraphQLFieldResolver } from "graphql";

import { findUserByTel } from "../../entitys/user";
import { Context } from "../../typings";

type MutationPayload = {
  tel: string;
  authCode: number;
};

export const loginUser: GraphQLFieldResolver<
  undefined,
  Context,
  MutationPayload
> = async (_, { tel, authCode }) => {
  console.log("LGIN USER");
  const user = await findUserByTel(tel);
  if (!user) return;

  return user.authCode === authCode ? user : undefined;
};
