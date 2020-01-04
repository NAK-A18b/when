import fetch from "node-fetch";

export const sendMessage = (tel: string, message: string) => {
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
    })
      .then(res => resolve(res))
      .catch(e => reject(`Request to Whatsapp Server failed with ${e}`));
  });
};
