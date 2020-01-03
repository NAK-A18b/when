const fetch = require("node-fetch");

module.exports.sendMessage = (tel, message) => {
  return new Promise((resolve, reject) => {
    var username = "nordakademie";
    var password = "T&;2]fX3EN/&v>5";
    var auth =
      "Basic " + Buffer.from(username + ":" + password).toString("base64");
    // new Buffer() is deprecated from v6

    fetch("https://35.196.195.229/sendMessage", {
      method: "POST",
      headers: {
        Authorization: auth,
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify([{ receiver: tel, text: message }])
    }).catch(e => console.error(`Request to Whatsapp Server failed with ${e}`));
  });
};
