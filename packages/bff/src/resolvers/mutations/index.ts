import { updateUser } from "./updateUser";
import { createCenturia } from "./createCenturia";
import { createConnection } from "./createConnection";

import { subscribeConnection } from "./subscribeConnection";
import { subscribeCenturia } from "./subscribeCenturia";
import { unsubscribeConnection } from "./unsubscribeConnection";

import { loginUser } from "./loginUser";
import { triggerAuth } from "./triggerAuth";

export const Mutation = {
  updateUser,
  createCenturia,
  createConnection,
  subscribeConnection,
  subscribeCenturia,
  unsubscribeConnection,
  loginUser,
  triggerAuth
};
