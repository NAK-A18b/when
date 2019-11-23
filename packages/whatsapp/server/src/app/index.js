'use strict';

const express = require('express');
const basicAuth = require('express-basic-auth');
const sulla = require('sulla');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

sulla.create().then(client => {
  const tokens = [];

  const app = express();
  app.use(express.json());
  app.use(basicAuth({
    users: {
      'nordakademie': 'T&;2]fX3EN/&v>5'
    }
  }));
  app.post('/sendMessage', async (req, res) => {
    const messages = req.body;
    for (let index in messages) {
      const message = messages[index];
      const {receiver, text} = message;
      await client.sendText(`${receiver}@c.us`, text);
      const response = {
        message: "Request received"
      };
      res.send(JSON.stringify(response));
      console.log(`Sent message "${text}" to ${receiver}`);

    }
  });

  app.get('/sendToken', async (req, res) => {
    const messages = req.body;
    for (let index in messages) {
      const message = messages[index];
      const {receiver} = message;
      const min = 100000;
      const max = 999999;
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      tokens.push({receiver: receiver, token: random});
      await client.sendText(`${receiver}@c.us`, `Dein Code für die Anmeldung lautet: ${random}`);
      setTimeout((receiver) => {
        const index = tokens.findIndex(x => x.receiver === receiver);
        if (index !== undefined) tokens.splice(index, 1);
      }, 1000 * 60, receiver);
      const response = {
        message: "Request received"
      };
      res.send(JSON.stringify(response));
      console.log(`Sent message "${text}" to ${receiver}`);

    }
  });

  app.get('/verifyToken', async (req, res) => {
    const messages = req.body;
    for (let index in messages) {
      const message = messages[index];
      const {receiver, token} = message;
      const index = tokens.findIndex(x => x.receiver === receiver);
      if (index !== undefined) {
        if(tokens[i].token === token) {
          const response = {
            message: "Request received"
          };
          res.send(JSON.stringify(response));
        }
      }
      const response = {
        message: "Request received"
      };
      res.send(JSON.stringify(response));
      console.log(`Sent message "${text}" to ${receiver}`);

    }
  });

  app.listen(PORT, HOST);
  console.log(`REST-Endpoint up`);
});