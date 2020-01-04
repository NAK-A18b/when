import { getTimes } from "../app/nordakademie";
import { sendMessage } from "../app/hvv/message";

export default () =>
  getTimes("A18b", 2, true).then(time => {
    if (time && (time.start.hour !== 9 || time.start.minute !== 15)) {
      sendMessage(
        "491604615070",
        `⚠️ Morgen beginnt die erste Vorlesung um *${time.start.hour}:${time.start.minute}*`
      );
    }
  });
