import { getEntry, listEntrys, createEntry } from "when-aws";
import { Connection } from "../typings";

const { CONNECTION_TABLE } = process.env;
if (!CONNECTION_TABLE) {
  throw new Error("Missing Environment Variable CONNECTION_TABLE");
}

export const getConnection = async (id: string) => {
  if (!id) return;

  return await getEntry<Connection>({
    TableName: CONNECTION_TABLE,
    Key: {
      id
    }
  });
};

export const listConnections = async () =>
  await listEntrys<Connection>({
    TableName: CONNECTION_TABLE
  });

export const createConnection = async (connection: Connection) =>
  await createEntry({
    TableName: CONNECTION_TABLE,
    Item: connection
  });
