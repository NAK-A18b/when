import { GraphQLFieldResolver } from "graphql";
import { Centuria } from "when-backend/src/typings";

import { Context } from "../../typings";

import { getUser, updateUser as updateUserFc } from "../../entitys/user";

const { USER_TABLE } = process.env;
if (!USER_TABLE) {
  throw new Error("Environment Variable Missing: USER_TABLE");
}

type MutationPayload = {
  input: {
    centuria: Centuria;
    tel: string;
  };
};

export const updateUser: GraphQLFieldResolver<
  undefined,
  Context,
  MutationPayload
> = async (_, { input: { centuria, tel } }, context) => {
  const user = context?.currentUser;
  if (!user) return;

  if (centuria) user.centuria = centuria;
  if (tel) user.tel = tel;

  await updateUserFc(user);
  return getUser(user.id);
};
