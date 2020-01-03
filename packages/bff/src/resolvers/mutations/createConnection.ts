import uuid from "uuid";
import { GraphQLFieldResolver } from "graphql";
import fetch from "node-fetch";

import { Context } from "../../typings";
import {
  getConnection,
  createConnection as createConnectionFc
} from "../../entitys/connection";

const { CONNECTION_TABLE } = process.env;
if (!CONNECTION_TABLE) {
  throw new Error("Environment Variable Missing: CONNECTION_TABLE");
}

const { LAMBDA_ENDPOINT } = process.env;
if (!LAMBDA_ENDPOINT) {
  throw new Error("Missing Environment Variable: 'LAMBDA_ENDPOINT'");
}

type MutationPayload = {
  start: string;
  end: string;
};

const getStation = (stationName: string) =>
  fetch(`${LAMBDA_ENDPOINT}/getStation`, {
    method: "POST",
    body: JSON.stringify({
      stationName
    })
  }).then(res => res.json());

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

  const connectionId = uuid.v1();
  await createConnectionFc({
    id: connectionId,
    start: startStation,
    end: endStation
  });

  return await getConnection(connectionId);
};
