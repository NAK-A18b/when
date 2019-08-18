'use strict';

const express = require('express');
const basicAuth = require('express-basic-auth')
const sulla = require('sulla');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

sulla.create().then(client => {
  const app = express();
  app.use(express.json());
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
  app.listen(PORT, HOST);
  console.log(`REST-Endpoint up`);
});