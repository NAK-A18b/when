import { GraphQLFieldResolver } from "graphql";
import { Context, User, Delay } from "../../typings";
import { listDelays } from "../../entitys/delay";

const userIsSubscribedTo = (user: User) => (delay: Delay) =>
  !!user.connections?.find(({ id }) => id === delay.id);
const hasDelay = (delay: Delay) =>
  !!delay.schedules[0].scheduleElements[0].from.depDelay;

export const delays: GraphQLFieldResolver<undefined, Context> = async (
  _,
  {},
  context
) => {
  const user = context?.currentUser;
  if (!user) return;

  return (await listDelays()).filter(userIsSubscribedTo(user)).filter(hasDelay);
};
