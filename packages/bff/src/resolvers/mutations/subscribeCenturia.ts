import { Context } from "../../typings";
import { GraphQLFieldResolver } from "graphql";
import { updateUser, getUser } from "../../entitys/user";
import { getCenturia } from "../../entitys/centuria";

type MutationPayload = {
  centuriaId: string;
};

export const subscribeCenturia: GraphQLFieldResolver<
  undefined,
  Context,
  MutationPayload
> = async (_, { centuriaId }, context) => {
  if (!context?.currentUser) return;

  const centuria = await getCenturia(centuriaId);
  await updateUser({
    ...context.currentUser,
    centuria
  });

  return await getUser(context.currentUser.id);
};
