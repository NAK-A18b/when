import { Centuria } from "../typings";
import { getEntry, createEntry, listEntrys } from "when-aws";

const { CENTURIA_TABLE } = process.env;
if (!CENTURIA_TABLE) {
  throw new Error("Missing Environment Variable CENTURIA_TABLE");
}

export const getCenturia = async (name: string) => {
  if (!name) return;

  return await getEntry<Centuria>({
    TableName: CENTURIA_TABLE,
    Key: {
      name
    }
  });
};

export const createCenturia = async (name: string, semester: number) =>
  await createEntry({
    TableName: CENTURIA_TABLE,
    Item: {
      name,
      semester
    }
  });

export const listCenturias = async () =>
  await listEntrys<Centuria>({
    TableName: CENTURIA_TABLE
  });
