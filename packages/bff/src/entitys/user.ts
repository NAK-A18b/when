import uuid from "uuid";
import { getEntry, createEntry, listEntrys } from "when-aws";

import { UserInput, User } from "../typings";

const { USER_TABLE } = process.env;
if (!USER_TABLE) {
  throw new Error("Missing Environment Variable USER_TABLE");
}

export const createUser = async (args: UserInput) =>
  await createEntry({
    TableName: USER_TABLE,
    Item: {
      id: uuid.v1(),
      connections: [],
      ...args
    }
  });

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

export const listUsers = async () =>
  await listEntrys<User>({
    TableName: USER_TABLE
  });
