import { updateEntry, getEntry, lambda } from "when-aws";

import { hvvRequest, getRouteRequestOptions } from "../app/hvv/index";
import {
  Connection,
  GetRouteResponse,
  GetRoutePayload,
  Schedule
} from "../typings";

const { CONNECTION_TABLE, DELAY_TABLE } = process.env;

if (!CONNECTION_TABLE) {
  throw new Error("Missing Environment Variable: CONNECTION_TABLE");
}

if (!DELAY_TABLE) {
  throw new Error("Missing Environment Variable: DELAY_TABLE");
}

type CheckDelayPayload = {
  connections: string[];
  hour: number;
  minute: number;
  tel: string;
};

const delayEntry = (id: string) =>
  getEntry<GetRouteResponse>({
    TableName: DELAY_TABLE,
    Key: {
      id
    }
  });

const minimizeSchedules = (realtimeSchedules: Schedule[]) =>
  realtimeSchedules.forEach(e => {
    e.scheduleElements.forEach(s => {
      delete s.paths;
    });
  });

export default ({ connections, hour, minute, tel }: CheckDelayPayload) => {
  connections.forEach(async id => {
    const connection = await getEntry<Connection>({
      TableName: CONNECTION_TABLE,
      Key: {
        id
      }
    });

    hvvRequest<GetRoutePayload, GetRouteResponse>(
      "getRoute",
      getRouteRequestOptions(connection, hour, minute)
    )
      .then(async ({ returnCode, realtimeSchedules }) => {
        if (returnCode === "OK" && realtimeSchedules) {
          minimizeSchedules(realtimeSchedules);

          const updateParams = {
            TableName: DELAY_TABLE,
            Key: {
              id: connection.id
            },
            UpdateExpression: "SET #realtimeSchedules =:val1",
            ExpressionAttributeNames: {
              "#realtimeSchedules": "realtimeSchedules"
            },
            ExpressionAttributeValues: {
              ":val1": realtimeSchedules
            }
          };

          const oldEntry = await delayEntry(id);
          await updateEntry(updateParams);
          const newEntry = await delayEntry(id);

          lambda
            .invoke({
              FunctionName: "when-notification-app-backend-dev-evaluateDelay",
              InvocationType: "Event",
              Payload: JSON.stringify({
                connection,
                oldEntry,
                newEntry,
                tel
              })
            })
            .send();
        }
      })
      .catch(e => {
        console.error(e);
      });
  });
};
