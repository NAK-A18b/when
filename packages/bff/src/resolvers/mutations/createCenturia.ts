import { GraphQLFieldResolver } from "graphql";

import {
  createCenturia as createCenturiaFnc,
  getCenturia
} from "../../entitys/centuria";
import { Context } from "../../typings";

const { CENTURIA_TABLE } = process.env;
if (!CENTURIA_TABLE) {
  throw new Error("Environment Variable Missing: CENTURIA_TABLE");
}

type MutationPayload = {
  name: string;
  semester: number;
};

export const createCenturia: GraphQLFieldResolver<
  undefined,
  Context,
  MutationPayload
> = async (_, { name, semester }: MutationPayload) =>
  createCenturiaFnc(name, semester).then(() => getCenturia(name));
