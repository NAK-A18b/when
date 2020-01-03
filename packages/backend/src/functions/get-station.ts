import { getStation as findStation } from "../app/hvv";

export type GetStationPayload = {
  stationName: string;
};

export const getStation = async (event: GetStationPayload) => {
  const result = await findStation(event.stationName);
  return result?.results[0] || null;
};
