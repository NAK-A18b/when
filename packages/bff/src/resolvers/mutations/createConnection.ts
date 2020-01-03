import uuid from "uuid";
import { createEntry, lambda } from "when-aws";
import { GraphQLFieldResolver } from "graphql";

import { Context, SDName } from "../../typings";

const { CONNECTION_TABLE } = process.env;
if (!CONNECTION_TABLE) {
  throw new Error("Environment Variable Missing: CONNECTION_TABLE");
}

type MutationPayload = {
  start: string;
  end: string;
};

const getStation = (name: string) =>
  lambda
    .invoke({
      FunctionName: "when-notification-app-backend-dev-getStation",
      InvocationType: "Event",
      Payload: JSON.stringify({
        stationName: name
      })
    })
    .promise()
    .then(res => res.Payload as GetStationResponse);

type GetStationResponse = SDName | null;

export const createConnection: GraphQLFieldResolver<
  undefined,
  Context,
  MutationPayload
> = async (_, { start, end }) => {
  const startStation = await getStation(start);

  if (!startStation) {
    return Promise.reject("Start station not found");
  }

  const endStation = await getStation(end);
  if (!endStation) {
    return Promise.reject("End station not found");
  }

  return await createEntry({
    TableName: CONNECTION_TABLE,
    Item: {
      id: uuid.v1(),
      start: startStation,
      end: endStation
    }
  });
};
