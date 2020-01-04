import { generateMessage, sendMessage } from "../app/hvv/message";
import { GetRouteResponse } from "../typings";

export type EvaluateDelayPayload = {
  oldEntry: GetRouteResponse;
  newEntry: GetRouteResponse;
  tel: string;
};

export default (event: EvaluateDelayPayload) => {
  const { oldEntry, newEntry, tel } = event;

  if (JSON.stringify(oldEntry) !== JSON.stringify(newEntry)) {
    newEntry.realtimeSchedules.forEach(({ scheduleElements }) => {
      scheduleElements.forEach(element => {
        if (element.line.name !== "Umstiegsfußweg") {
          const msg = generateMessage(element);

          if (msg) {
            console.info(`Sending message "${msg}" to ${tel}`);
            sendMessage(tel, msg);
          }
        }
      });
    });
  }
};
