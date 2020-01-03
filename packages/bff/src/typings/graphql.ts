import { User } from "./dynamoDB";

export type Context = undefined | AuthContext;

export type AuthContext = {
  currentUser: User | undefined;
  functionName: string;
  event: any;
  context: any;
};
