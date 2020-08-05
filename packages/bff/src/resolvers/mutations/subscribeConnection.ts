import { getConnection } from "../../entitys/connection";

import { Context } from "../../typings";
import { GraphQLFieldResolver } from "graphql";
import { updateUser, getUser } from "../../entitys/user";

type MutationPayload = {
  connectionId: string;
};

export const subscribeConnection: GraphQLFieldResolver<
  undefined,
  Context,
  MutationPayload
> = async (_, { connectionId }, context) => {
  const user = context.currentUser;
  if (!user) return;

  const connections = user.connections || [];

  const connection = await getConnection(connectionId);
  if (!connection) return;
  if (connections && !!connections.find(({ id }) => id === connection.id)) {
    return user;
  }

  await updateUser({ ...user, connections: [...connections, connection] });
  return await getUser(user.id);
};
