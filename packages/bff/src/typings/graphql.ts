import { User } from "./dynamoDB";

export type Context = {
  currentUser: User | undefined;
  functionName: string;
  event: any;
  context: any;
};
