import { Context } from "../../typings";
import { GraphQLFieldResolver } from "graphql";
import { updateUser, getUser } from "../../entitys/user";

type MutationPayload = {
  connectionId: string;
};

export const unsubscribeConnection: GraphQLFieldResolver<
  undefined,
  Context,
  MutationPayload
> = async (_, { connectionId }, context) => {
  const user = context.currentUser;
  if (!user) return;

  await updateUser({
    ...user,
    connections:
      user.connections &&
      user.connections.filter(conn => conn.id !== connectionId)
  });
  return await getUser(user.id);
};
