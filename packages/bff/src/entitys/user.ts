import uuid from "uuid";
import { getEntry, createEntry, listEntrys } from "when-aws";
import TokenGenerator from "uuid-token-generator";

import { CreateUserInput, User } from "../typings";

const { USER_TABLE } = process.env;
if (!USER_TABLE) {
  throw new Error("Missing Environment Variable USER_TABLE");
}

export const createUser = async (args: CreateUserInput) => {
  const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
  const token = tokgen.generate();

  return await createEntry({
    TableName: USER_TABLE,
    Item: {
      id: uuid.v1(),
      connections: [],
      token,
      ...args
    }
  });
};

export const updateUser = async (user: User) =>
  await createEntry({
    TableName: USER_TABLE,
    Item: user
  });

export const getUser = async (id: string) => {
  if (!id) return;

  return await getEntry<User>({
    TableName: USER_TABLE,
    Key: {
      id
    }
  });
};

export const findUserByTel = async (tel: string) => {
  const users = await listUsers();
  return users.find(u => u.tel === tel);
};

export const findUserByToken = async (token: string) => {
  const users = await listUsers();
  return users.find(u => u.token === token);
};

export const listUsers = async () =>
  await listEntrys<User>({
    TableName: USER_TABLE
  });
