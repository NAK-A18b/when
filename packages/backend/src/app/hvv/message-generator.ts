import { ScheduleElement, JourneySDName } from "../../typings";

const emojis = ["🙄", "😑", "😐", "😒"];

export const generateMessage = ({
  from,
  to,
  line,
  cancelled
}: ScheduleElement): string => {
  const emoji = randomInt(4);

  if (cancelled) {
    return `⚠️ ${line.name} von ${from.name} nach ${to.name}, ursprünglich um ${from.depTime.time}, fällt aus ${emojis[emoji]}`;
  } else if (hasDelay(from) && hasDelay(to)) {
    const newDepTime = calculateNewDepTime(from);
    const newArrTime = calculateNewArrTime(to);

    return `Verspätung für ${line.name} von ${from.name} nach ${to.name}
    Abfahrt: ~${from.depTime.time}~ ${newDepTime} (+${from.depDelay / 60})
    Ankunft: ~${to.arrTime.time}~ ${newArrTime} (+${to.arrDelay / 60})`;
  } else if (hasDelay(from)) {
    const newDepTime = calculateNewDepTime(from);

    return `Abfahrtsverspätung für ${line.name} von ${from.name} nach ${to.name}
    Abfahrt: ~${from.depTime.time}~ ${newDepTime} (+${from.depDelay / 60})
    Ankunft: pünktlich ✔`;
  } else if (hasDelay(to)) {
    const newArrTime = calculateNewArrTime(to);

    return `Ankunftsverspätung für ${line.name} von ${from.name} nach ${to.name}
    Abfahrt: pünktlich ✔
    Ankunft: ~${to.arrTime.time}~ ${newArrTime} (+${to.arrDelay / 60})`;
  } else {
    console.info(
      `${line.name} von ${from.name} nach ${to.name} um ${from.depTime.time} hat keine Verspätung`
    );
    return "";
  }
};

const calculateNewDepTime = (from: JourneySDName): string => {
  const time = from.depTime.time.toString();
  const summedUpTime = parseInt(time.substring(3, 5)) + from.depDelay / 60;

  return summedUpTime > 59
    ? `${parseInt(time.substring(0, 2)) + 1}:${summedUpTime - 60}`
    : `${time.substring(0, 2)}:${summedUpTime}`;
};

const calculateNewArrTime = (to: JourneySDName): string => {
  const time = to.arrTime.time.toString();
  const summedUpTime = parseInt(time.substring(3, 5)) + to.arrDelay / 60;

  return summedUpTime > 59
    ? `${parseInt(time.substring(0, 2)) + 1}:${summedUpTime - 60}`
    : `${time.substring(0, 2)}:${summedUpTime}`;
};

const hasDelay = ({ depDelay, arrDelay }: JourneySDName): boolean => {
  //Delay has to be at least two minutes
  return (!!depDelay && depDelay > 59) || (!!arrDelay && arrDelay > 59);
};

const randomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};
