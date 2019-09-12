const emojis = ['🙄', '😑', '😐', '😒'];

module.exports.generateMessage = (element) => {
  const {from, to, line} = element;
  const emoji = getRandomInt(4);
  if (hasDelay(from) && hasDelay(to)) {
    const i = 0;
    if (i === 0) {
      return `${line.name} von ${from.name} nach ${to.name}, ursprünglich um ${
        from.depTime.time
      }, hat eine Verspätung von ${from.depDelay / 60} Minuten und wird ${to.arrDelay / 60} Minuten später ankommen ${emojis[emoji]}`;
    }
  } else if (hasDelay(from)) {
    return `${line.name} ab ${from.name}, ursprünglich um ${
      from.depTime.time
    }, hat eine Verspätung von ${from.depDelay / 60} Minuten  ${emojis[emoji]}. Immerhin soll er pünkltich an ${to.name} ankommen...`;
  } else if (hasDelay(to)) {
    return `${line.name} ab ${from.name} um ${from.depTime.time} wird voraussichtlich ${to.arrDelay / 60} Minuten später ${to.name} erreichen ${emojis[emoji]}`;
  } else {
    console.log(`${line.name} von ${from.name} nach ${to.name} um ${from.depTime.time} hat keine Verspätung`);
  }
};

const hasDelay = element => {
  //Delay has to be at least two minutes
  return (
    element.depDelay &&
    element.depDelay > 59) || (
    element.arrDelay &&
    element.arrDelay > 59
  );
};

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};