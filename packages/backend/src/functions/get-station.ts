import { getStation as findStation } from "../app/hvv";

export type GetStationPayload = {
  body: string;
};

export default async ({ body }: GetStationPayload) => {
  const { stationName } = JSON.parse(body);
  const result = await findStation(stationName);

  return {
    statusCode: 200,
    body: JSON.stringify((result?.results && result?.results[0]) || null)
  };
};
