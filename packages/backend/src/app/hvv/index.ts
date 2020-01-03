import {
  Connection,
  CheckNamePayload,
  BasePayload,
  GetRoutePayload,
  CheckNameResponse
} from "../../typings";
import fetch from "node-fetch";

const crypto = require("crypto");

export const hvvRequest = <B extends BasePayload, T>(
  method: string,
  body: B
): Promise<T> => {
  return new Promise((resolve, reject) => {
    //Set HVV API Version
    body.version = process.env.HVV_API_VERSION || "36";
    const requestBody = JSON.stringify(body);

    //Generate hash needed for hvv api server authentication
    const hash = crypto
      .createHmac("sha1", process.env.HVV_API_KEY)
      .update(requestBody)
      .digest("base64");

    fetch(`https://api-test.geofox.de/gti/public/${method}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "geofox-auth-type": "HmacSHA1",
        Connection: "Keep-Alive",
        "geofox-auth-user": "eliashuehne",
        "geofox-auth-signature": hash
      },
      body: requestBody
    })
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
  });
};

export const getStation = (
  name: string
): Promise<CheckNameResponse> | undefined => {
  if (name === "") return;

  const params = {
    theName: {
      name,
      type: "STATION"
    },
    maxList: 1
  };

  return hvvRequest<CheckNamePayload, CheckNameResponse>("checkName", params);
};

export const getRouteRequestOptions = (
  connection: Connection,
  hour: number,
  minute: number
): GetRoutePayload => ({
  language: "de",
  start: connection.start,
  dest: connection.end,
  time: {
    date: "heute",
    time: hour + ":" + minute
  },
  timeIsDeparture: true,
  schedulesBefore: 0,
  schedulesAfter: 0,
  realtime: "REALTIME"
});
