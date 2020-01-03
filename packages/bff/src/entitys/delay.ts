import { listEntrys } from "when-aws";
import { Delay } from "../typings";

const { DELAY_TABLE } = process.env;
if (!DELAY_TABLE) {
  throw new Error("Missing Environment Variable DELAY_TABLE");
}

export const listDelays = async () =>
  await listEntrys<Delay>({
    TableName: DELAY_TABLE
  });
